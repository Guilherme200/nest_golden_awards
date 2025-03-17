import { MovieEntity } from '../entities/movie.entity';

export interface MovieRepository {
  loadCsv(): void;
  create(movie: Partial<MovieEntity>): Promise<MovieEntity>;
  findWinners(): Promise<MovieEntity[]>;
}