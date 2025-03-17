import { MovieRepository } from '../domain/repositories/movie.repository';
import { GroupByProducerWinnersService } from '../domain/services/group-by-producer-winners.service';
import { CalculateIntervalsForProducerService } from '../domain/services/calculate-intervals-for-producer.service';
import { GetMinMaxIntervalForProducerService } from '../domain/services/get-min-max-interval-for-producer.service';

export class GetAwardIntervalsUseCase {
  constructor(private readonly movieRepository: MovieRepository) {
  }

  async execute(): Promise<object> {
    const winners = await this.movieRepository.findWinners();
    const producerAwards = GroupByProducerWinnersService.execute(winners);
    const intervals = CalculateIntervalsForProducerService.execute(producerAwards);
    return GetMinMaxIntervalForProducerService.execute(intervals);
  }
}
