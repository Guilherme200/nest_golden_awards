import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { ImportMoviesUseCase } from './import-movies.use-case';
import { MovieTypeorm } from '../infrastructure/typeorm/movie.typeorm';
import { GetAwardIntervalsUseCase } from './get-award-intervals.usecase';
import { MovieRepositoryTypeorm } from '../infrastructure/typeorm/movie.repository.typeorm';

describe('GetAwardIntervalsUseCase (Integration)', () => {
  let useCase: any;
  let repository: any;
  let dataSource: any;
  let movieRepository: any;

  beforeEach(async () => {
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
        {
          provide: 'MovieRepository',
          useClass: MovieRepositoryTypeorm,
        },
        {
          provide: GetAwardIntervalsUseCase,
          useFactory: (repository: MovieRepositoryTypeorm) => new GetAwardIntervalsUseCase(repository),
          inject: ['MovieRepository'],
        },
      ],
    }).compile();

    repository = module.get<MovieRepositoryTypeorm>(MovieRepositoryTypeorm);
    useCase = module.get<ImportMoviesUseCase>(GetAwardIntervalsUseCase);
    dataSource = module.get<DataSource>(DataSource);
    movieRepository = dataSource.getRepository(MovieTypeorm);
    await new ImportMoviesUseCase(repository).execute();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
    expect(movieRepository).toBeDefined();
  });

  it('should return min and max award intervals for producers', async () => {
    const result = await useCase.execute();

    expect(result).toBeDefined();

    expect(result).toMatchObject({
      min: [
        {
          producer: 'Joel Silver',
          interval: 1,
          previousWin: 1990,
          followingWin: 1991
        }
      ],
      max: [
        {
          producer: 'Matthew Vaughn',
          interval: 13,
          previousWin: 2002,
          followingWin: 2015
        }
      ]
    });
  });
});
