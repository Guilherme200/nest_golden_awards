import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { MovieRepository } from '../domain/repositories/movie.repository';

@Injectable()
export class ImportMoviesUseCase implements OnModuleInit {
  constructor(
    @Inject('MovieRepository')
    private readonly repository: MovieRepository
  ) {}

  async onModuleInit(): Promise<void> {
    console.info('starting csv import');
    await this.execute();
    console.info('csv import completed');
  }

  public async execute(): Promise<any> {
    return await this.repository.loadCsv();
  }
}
