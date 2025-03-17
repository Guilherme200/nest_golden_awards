import { DataSource } from 'typeorm';
import { MovieTypeorm } from './movie.typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { MovieEntity } from '../../domain/entities/movie.entity';
import { MovieRepositoryTypeorm } from './movie.repository.typeorm';

describe('MovieRepositoryTypeorm (Integration)', () => {
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
      providers: [MovieRepositoryTypeorm],
    }).compile();

    repository = module.get<MovieRepositoryTypeorm>(MovieRepositoryTypeorm);
    dataSource = module.get<DataSource>(DataSource);
    movieRepository = dataSource.getRepository(MovieTypeorm);
  });

  beforeEach(async () => {
    await movieRepository.clear();
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('should create a movie', async () => {
    const movie = new MovieEntity('2022', 'Test Movie', 'Test Studio', 'Test Producer', 'yes');
    const savedMovie = await repository.create(movie);

    expect(savedMovie).toBeDefined();
    expect(savedMovie.title).toBe('Test Movie');
  });

  it('should find winners', async () => {
    await repository.create(new MovieEntity('2023', 'Winner Movie', 'Studio A', 'Producer A', 'yes'));
    await repository.create(new MovieEntity('2023', 'Non-Winner Movie', 'Studio B', 'Producer B', ''));

    const winners = await repository.findWinners();
    expect(winners.length).toBe(1);
    expect(winners[0].title).toBe('Winner Movie');
  });
});
