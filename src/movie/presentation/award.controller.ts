import { Controller, Get } from '@nestjs/common';
import { GetAwardIntervalsUseCase } from '../application/get-award-intervals.usecase';

@Controller('awards')
export class AwardController {
  constructor(private readonly awardIntervalsUseCase: GetAwardIntervalsUseCase) {}

  @Get('intervals')
  async getIntervals(): Promise<object> {
    return await this.awardIntervalsUseCase.execute();
  }
}
