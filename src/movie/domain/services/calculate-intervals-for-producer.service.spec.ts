import { Test, TestingModule } from '@nestjs/testing';
import { CalculateIntervalsForProducerService } from './calculate-intervals-for-producer.service';
import { AwardType } from '../types/award.type';

describe('CalculateIntervalsForProducerService', () => {
  let service: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculateIntervalsForProducerService],
    }).compile();

    service = module.get<CalculateIntervalsForProducerService>(CalculateIntervalsForProducerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('should calculate intervals correctly for each producer', () => {
      const producerAwards: { [producer: string]: AwardType[] } = {
        'Producer A': [
          { year: 2019, producers: 'Producer A', winner: 'yes' },
          { year: 2021, producers: 'Producer A', winner: 'yes' },
          { year: 2023, producers: 'Producer A', winner: 'yes' },
        ],
        'Producer B': [
          { year: 2020, producers: 'Producer B', winner: 'yes' },
          { year: 2022, producers: 'Producer B', winner: 'yes' },
        ],
      };

      const result = CalculateIntervalsForProducerService.execute(producerAwards);

      expect(result).toEqual([
        { producer: 'Producer A', interval: 2, previousWin: 2019, followingWin: 2021 },
        { producer: 'Producer A', interval: 2, previousWin: 2021, followingWin: 2023 },
        { producer: 'Producer B', interval: 2, previousWin: 2020, followingWin: 2022 },
      ]);
    });

    it('should handle a producer with only one award correctly', () => {
      const producerAwards: { [producer: string]: AwardType[] } = {
        'Producer C': [
          { year: 2021, producers: 'Producer C', winner: 'yes' },
        ],
      };

      const result = CalculateIntervalsForProducerService.execute(producerAwards);

      expect(result).toEqual([]);
    });

    it('should handle multiple producers with the same award year correctly', () => {
      const producerAwards: { [producer: string]: AwardType[] } = {
        'Producer A': [
          { year: 2019, producers: 'Producer A', winner: 'yes' },
          { year: 2021, producers: 'Producer A', winner: 'yes' },
        ],
        'Producer B': [
          { year: 2021, producers: 'Producer B', winner: 'yes' },
          { year: 2023, producers: 'Producer B', winner: 'yes' },
        ],
      };

      const result = CalculateIntervalsForProducerService.execute(producerAwards);

      expect(result).toEqual([
        { producer: 'Producer A', interval: 2, previousWin: 2019, followingWin: 2021 },
        { producer: 'Producer B', interval: 2, previousWin: 2021, followingWin: 2023 },
      ]);
    });

    it('should return an empty array when no producers are provided', () => {
      const producerAwards: { [producer: string]: AwardType[] } = {};

      const result = CalculateIntervalsForProducerService.execute(producerAwards);

      expect(result).toEqual([]);
    });
  });
});
