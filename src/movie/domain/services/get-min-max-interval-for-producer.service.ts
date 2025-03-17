import { ProducerIntervalType } from '../types/producer-interval.type';

export class GetMinMaxIntervalForProducerService {
  public static execute(intervals: ProducerIntervalType[]): { min: ProducerIntervalType[]; max: ProducerIntervalType[] } {
    let minInterval = Infinity;
    let maxInterval = -Infinity;
    let minIntervals: ProducerIntervalType[] = [];
    let maxIntervals: ProducerIntervalType[] = [];

    intervals.forEach((item) => {
      if (item.interval < minInterval) {
        minInterval = item.interval;
        minIntervals = [item];
      } else if (item.interval === minInterval) {
        minIntervals.push(item);
      }

      if (item.interval > maxInterval) {
        maxInterval = item.interval;
        maxIntervals = [item];
      } else if (item.interval === maxInterval) {
        maxIntervals.push(item);
      }
    });

    return { min: minIntervals, max: maxIntervals };
  }
}