import { MovieEntity } from '../entities/movie.entity';

export interface MovieRepository {
  loadCsv(): Promise<void>;
  create(movie: Partial<MovieEntity>): Promise<MovieEntity>;
  findWinners(): Promise<MovieEntity[]>;
}