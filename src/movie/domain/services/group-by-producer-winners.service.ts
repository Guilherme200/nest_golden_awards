import { MovieEntity } from '../entities/movie.entity';
import { AwardType } from '../types/award.type';

export class GroupByProducerWinnersService {
  public static execute(winners: MovieEntity[]): { [producer: string]: AwardType[] } {
    const producerAwards: { [producer: string]: AwardType[] } = {};

    winners.forEach((record) => {
      if (record.isWinner()) {
        const year = parseInt(record.year);
        const producers = record.producers.split(/,\s*|\s+and\s+/).map((producer) => producer.trim());

        producers.forEach((producer) => {
          if (!producerAwards[producer]) {
            producerAwards[producer] = [];
          }
          producerAwards[producer].push({ year, producers: producer, winner: 'yes' });
        });
      }
    });

    return producerAwards;
  }
}