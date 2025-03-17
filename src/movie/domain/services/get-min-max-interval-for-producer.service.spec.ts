import { Test, TestingModule } from '@nestjs/testing';
import { GetMinMaxIntervalForProducerService } from './get-min-max-interval-for-producer.service';
import { ProducerIntervalType } from '../types/producer-interval.type';

describe('GetMinMaxIntervalForProducerService', () => {
  let service: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetMinMaxIntervalForProducerService],
    }).compile();

    service = module.get<GetMinMaxIntervalForProducerService>(GetMinMaxIntervalForProducerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('should return the correct min and max intervals for producers', () => {
      const intervals: ProducerIntervalType[] = [
        { producer: 'Producer A', interval: 2, previousWin: 1994, followingWin: 1996 },
        { producer: 'Producer B', interval: 4, previousWin: 1994, followingWin: 1998 },
        { producer: 'Producer A', interval: 1, previousWin: 1994, followingWin: 1995 },
        { producer: 'Producer C', interval: 4, previousWin: 1994, followingWin: 1998 },
        { producer: 'Producer B', interval: 5, previousWin: 1994, followingWin: 1999},
      ];

      const result = GetMinMaxIntervalForProducerService.execute(intervals);

      expect(result).toEqual({
        min: [{ producer: 'Producer A', interval: 1, previousWin: 1994, followingWin: 1995 }],
        max: [{ producer: 'Producer B', interval: 5, previousWin: 1994, followingWin: 1999}],
      });
    });

    it('should return the correct min and max intervals when multiple producers have the same interval', () => {
      const intervals: ProducerIntervalType[] = [
        { producer: 'Producer A', interval: 2, previousWin: 1994, followingWin: 1996 },
        { producer: 'Producer B', interval: 2, previousWin: 1994, followingWin: 1996 },
        { producer: 'Producer C', interval: 5, previousWin: 1994, followingWin: 1999 },
        { producer: 'Producer D', interval: 5, previousWin: 1994, followingWin: 1999 },
      ];

      const result = GetMinMaxIntervalForProducerService.execute(intervals);

      expect(result).toEqual({
        min: [
          { producer: 'Producer A', interval: 2, previousWin: 1994, followingWin: 1996 },
          { producer: 'Producer B', interval: 2, previousWin: 1994, followingWin: 1996 },
        ],
        max: [
          { producer: 'Producer C', interval: 5, previousWin: 1994, followingWin: 1999 },
          { producer: 'Producer D', interval: 5, previousWin: 1994, followingWin: 1999 },
        ],
      });
    });

    it('should return empty arrays if no intervals are provided', () => {
      const intervals: ProducerIntervalType[] = [];

      const result = GetMinMaxIntervalForProducerService.execute(intervals);

      expect(result).toEqual({ min: [], max: [] });
    });
  });
});
