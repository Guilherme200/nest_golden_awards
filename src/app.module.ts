import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CsvBuilder } from './csv/csv.builder';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [CsvBuilder],
})
export class AppModule {}
