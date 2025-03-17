import { Injectable, OnModuleInit } from '@nestjs/common';
import { MovieRepository } from '../domain/movie.repository';

@Injectable()
export class ImportMovieListUseCase implements OnModuleInit {
  constructor(private readonly repository: MovieRepository) {}

  async onModuleInit(): Promise<void> {
    console.info('starting csv import');
    await this.execute();
    console.info('csv import completed');
  }

  public async execute(): Promise<any> {
    return this.repository.loadCsv();
  }
}
