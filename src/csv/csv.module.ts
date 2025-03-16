import { Module } from '@nestjs/common';
import { CsvBuilder } from './csv.builder';

@Module({
  imports: [],
  controllers: [],
  providers: [CsvBuilder],
})
export class AppModule {}
