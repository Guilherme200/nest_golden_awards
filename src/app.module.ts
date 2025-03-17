import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieModule } from './movie/movie.module';
import { MovieTypeorm } from './movie/infrastructure/typeorm/movie.typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [MovieTypeorm],
      synchronize: true,
    }),
    MovieModule,
  ],
  controllers: [],
})

export class AppModule {
}
