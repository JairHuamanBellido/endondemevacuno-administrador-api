import { InflowDITokens } from '@domain/Inflow/di/InflowDITokens';
import { CreateInflowService } from '@domain/Inflow/service/CreateInflowService';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { HttpRestApiCreateInflow } from '../documentation/HttpRestApiCreateInflow';

@Controller('inflow')
export class InflowController {
  constructor(
    @Inject(InflowDITokens.CreateInflowService)
    private readonly createInflowService: CreateInflowService,
  ) {}

  @Post('/')
  public async createInflow(@Body() payload: HttpRestApiCreateInflow) {
    return await this.createInflowService.execute(payload);
  }
}
