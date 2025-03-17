import { Controller, Get } from '@nestjs/common';

@Controller('movies')
export class MovieController {
  constructor() {}

  @Get()
  async execute(): Promise<string> {
    return '';
  }
}
