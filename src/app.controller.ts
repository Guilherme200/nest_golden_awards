import { CsvBuilder } from './csv/csv.builder';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly csvBuilder: CsvBuilder) {}

  @Get()
  getHello(): string {
    const filePath = './movielist.csv';
    const headers = ['year', 'title', 'studios', 'producers', 'winner'];

    this.csvBuilder.setFilePath(filePath)
      .setHeaders(headers)
      .load((item: object) => {
        console.log(item);
      })

    return '';
  }
}
