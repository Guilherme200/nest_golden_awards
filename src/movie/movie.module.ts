import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwardController } from './presentation/award.controller';
import { MovieTypeorm } from './infrastructure/typeorm/movie.typeorm';
import { ImportMoviesUseCase } from './application/import-movies.use-case';
import { GetAwardIntervalsUseCase } from './application/get-award-intervals.usecase';
import { MovieRepositoryTypeorm } from './infrastructure/typeorm/movie.repository.typeorm';

@Module({
  controllers: [AwardController],
  imports: [TypeOrmModule.forFeature([MovieTypeorm])],
  providers: [
    {
      provide: 'MovieRepository',
      useClass: MovieRepositoryTypeorm,
    },
    {
      provide: ImportMoviesUseCase,
      useFactory: (repository: MovieRepositoryTypeorm) => new ImportMoviesUseCase(repository),
      inject: ['MovieRepository'],
    },
    {
      provide: GetAwardIntervalsUseCase,
      useFactory: (repository: MovieRepositoryTypeorm) => new GetAwardIntervalsUseCase(repository),
      inject: ['MovieRepository'],
    },
  ],
})
export class MovieModule {}
