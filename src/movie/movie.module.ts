import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieController } from './presentation/movie.controller';
import { MovieTypeorm } from './infrastructure/typeorm/movie.typeorm';
import { ImportMovieListUseCase } from './application/import-movie-list.use-case';
import { MovieRepositoryTypeorm } from './infrastructure/typeorm/movie.repository.typeorm';

@Module({
  controllers: [MovieController],
  imports: [TypeOrmModule.forFeature([MovieTypeorm])],
  providers: [
    {
      provide: 'MovieRepository',
      useClass: MovieRepositoryTypeorm,
    },
    {
      provide: ImportMovieListUseCase,
      useFactory: (repository: MovieRepositoryTypeorm) => new ImportMovieListUseCase(repository),
      inject: ['MovieRepository'],
    },
  ],
})
export class MovieModule {}
