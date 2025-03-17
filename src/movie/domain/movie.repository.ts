import { MovieEntity } from './movie.entity';

export interface MovieRepository {
  loadCsv(): void;
  create(movie: Partial<MovieEntity>): Promise<MovieEntity>;
}