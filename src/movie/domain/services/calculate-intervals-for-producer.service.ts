import { AwardType } from '../types/award.type';
import { ProducerIntervalType } from '../types/producer-interval.type';

export class CalculateIntervalsForProducerService {
  public static execute(producerAwards: { [producer: string]: AwardType[] }): ProducerIntervalType[] {
    const intervals: ProducerIntervalType[] = [];

    for (const producer in producerAwards) {
      const awards = producerAwards[producer].sort((a, b) => a.year - b.year);

      for (let i = 0; i < awards.length - 1; i++) {
        const current = awards[i];
        const next = awards[i + 1];
        const interval = next.year - current.year;

        intervals.push({
          producer,
          interval,
          previousWin: current.year,
          followingWin: next.year,
        });
      }
    }

    return intervals;
  }
}