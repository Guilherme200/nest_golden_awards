import { Test, TestingModule } from '@nestjs/testing';
import { MovieEntity } from '../entities/movie.entity';
import { GroupByProducerWinnersService } from './group-by-producer-winners.service';

describe('GroupByProducerWinnersService', () => {
  let service: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupByProducerWinnersService],
    }).compile();

    service = module.get<GroupByProducerWinnersService>(GroupByProducerWinnersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('should group winners by producer and award them correctly', () => {
      const winners: MovieEntity[] = [
        new MovieEntity('2021', 'Movie 1', 'Studio A', 'Producer A, Producer B', 'yes'),
        new MovieEntity('2022', 'Movie 2', 'Studio A', 'Producer A', 'yes'),
        new MovieEntity('2021', 'Movie 3', 'Studio C', 'Producer B and Producer C', ''),
      ];

      const result = GroupByProducerWinnersService.execute(winners);

      expect(result).toEqual({
        'Producer A': [
          { year: 2021, producers: 'Producer A', winner: 'yes' },
          { year: 2022, producers: 'Producer A', winner: 'yes' },
        ],
        'Producer B': [
          { year: 2021, producers: 'Producer B', winner: 'yes' },
        ]
      });
    });

    it('should not include movies that are not winners', () => {
      const winners: MovieEntity[] = [
        new MovieEntity('2021', 'Movie 1', 'Studio 1', 'Producer A', ''),
        new MovieEntity('2022', 'Movie 2', 'Studio 2', 'Producer B', ''),
      ];

      const result = GroupByProducerWinnersService.execute(winners);

      expect(result).toEqual({});
    });

    it('should handle an empty list of winners', () => {
      const winners: MovieEntity[] = [];

      const result = GroupByProducerWinnersService.execute(winners);

      expect(result).toEqual({});
    });
  });
});
