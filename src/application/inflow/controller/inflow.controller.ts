import { InflowDITokens } from '@domain/Inflow/di/InflowDITokens';
import { Period } from '@domain/Inflow/model/Period';
import { CreateInflowService } from '@domain/Inflow/service/CreateInflowService';
import { GetInflowBetweenDatesService } from '@domain/Inflow/service/GetInflowBetweenDatesService';
import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { HttpRestApiCreateInflow } from '../documentation/HttpRestApiCreateInflow';

@Controller('inflow')
export class InflowController {
  constructor(
    @Inject(InflowDITokens.CreateInflowService)
    private readonly createInflowService: CreateInflowService,

    @Inject(InflowDITokens.GetInflowBetweenDatesService)
    private readonly getInflowBetweensDatesService: GetInflowBetweenDatesService,
  ) {}

  @Post('/')
  public async createInflow(@Body() payload: HttpRestApiCreateInflow) {
    return await this.createInflowService.execute(payload);
  }

  @Get('/')
  public async getInflowBetweenDates(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('vaccineCenterId') vaccineCenterId: string,
    @Query('period') period: Period,
  ) {
    return await this.getInflowBetweensDatesService.execute(
      startDate,
      endDate,
      vaccineCenterId,
      period,
    );
  }
}
