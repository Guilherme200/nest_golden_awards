import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import { CsvReader } from '../csv/csv-reader';
import { MovieTypeorm } from './movie.typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import { MovieEntity } from '../../domain/entities/movie.entity';
import { MovieRepository } from '../../domain/repositories/movie.repository';

interface IMovie {
  title: string,
  year: string,
  studios: string,
  producers: string,
  winner: string,
}

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

    new CsvReader().load(filePath, headers, (item: IMovie) => {
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

  async findWinners(): Promise<MovieEntity[]> {
    const entities = await this.repository.find({ where: { winner: 'yes' } });
    return entities.map((item: IMovie) => new MovieEntity(
      item.year,
      item.title,
      item.studios,
      item.producers,
      item.winner
    ));
  }
}
