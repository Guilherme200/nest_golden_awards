import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import { MovieRepository } from '../../domain/movie.repository';
import { MovieTypeorm } from './movie.typeorm';
import { CsvReader } from '../csv/csv-reader';
import { MovieEntity } from '../../domain/movie.entity';

@Injectable()
export class MovieRepositoryTypeorm implements MovieRepository {
  constructor(
    @InjectRepository(MovieTypeorm)
    private readonly repository: Repository<MovieTypeorm>,
  ) {
  }

  async loadCsv(): Promise<void> {
    const filePath: string = './movie-list.csv';
    const headers: string[] = ['year', 'title', 'studios', 'producers', 'winner'];

    new CsvReader().load(filePath, headers, (item: IMovieCsv) => {
      const movie = new MovieEntity(
        item.year,
        item.title,
        item.studios,
        item.producers,
        item.winner
      );

      this.create(movie);
    })
  }

  async create(movie: MovieEntity): Promise<MovieEntity> {
    return this.repository.save(movie);
  }
}


interface IMovieCsv {
  title: string,
  year: string,
  studios: string,
  producers: string,
  winner: string,
}
