import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { MovieTypeorm } from '../infrastructure/typeorm/movie.typeorm';
import { MovieRepositoryTypeorm } from '../infrastructure/typeorm/movie.repository.typeorm';
import { ImportMoviesUseCase } from './import-movies.use-case';

jest.mock('../infrastructure/csv/csv-reader');

describe('ImportMoviesUseCase (Integration)', () => {
  let useCase: any;
  let repository: any;
  let dataSource: any;
  let movieRepository: any;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [MovieTypeorm],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([MovieTypeorm]),
      ],
      providers: [
        MovieRepositoryTypeorm,
        ImportMoviesUseCase,
        {
          provide: 'MovieRepository',
          useClass: MovieRepositoryTypeorm,
        },
      ],
    }).compile();

    repository = module.get<MovieRepositoryTypeorm>(MovieRepositoryTypeorm);
    useCase = module.get<ImportMoviesUseCase>(ImportMoviesUseCase);
    dataSource = module.get<DataSource>(DataSource);
    movieRepository = dataSource.getRepository(MovieTypeorm);
  });

  beforeEach(async () => {
    await movieRepository.clear();
    await movieRepository.save({title: 'Movie 1', year: 1994, studios: 'Studio 1', producers: 'Producer 1', winner: 'yes' })
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('should execute CSV import and store movies in the database', async () => {
    await useCase.execute();
    const movies = await movieRepository.find();

    expect(movies).toHaveLength(1);
    expect(movies[0]).toHaveProperty('title');
  });
});
