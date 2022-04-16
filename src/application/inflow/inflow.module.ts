import { InflowDITokens } from '@domain/Inflow/di/InflowDITokens';
import { IInflowRepository } from '@domain/Inflow/interface/IInflowRepository.interface';
import { CreateInflowService } from '@domain/Inflow/service/CreateInflowService';
import { GetInflowBetweenDatesService } from '@domain/Inflow/service/GetInflowBetweenDatesService';
import { VaccineCenterDITokens } from '@domain/VaccineCenter/di/VaccineCenterDITokens';
import { IVaccineCenterRepository } from '@domain/VaccineCenter/interface/IVaccineCenterRepository.interface';
import { TypeOrmInfloRepository } from '@infrastructure/database/repositories/InflowRepository';
import { TypeormVaccinateCenterRepository } from '@infrastructure/database/repositories/VaccineCenterRepository';
import { Module, Provider } from '@nestjs/common';
import { Connection } from 'typeorm';
import { InflowController } from './controller/inflow.controller';

const persistenceProvicer: Provider[] = [
  {
    provide: InflowDITokens.IInflowRepository,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(TypeOrmInfloRepository),
    inject: [Connection],
  },
  {
    provide: VaccineCenterDITokens.IVaccineCenterRepository,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(TypeormVaccinateCenterRepository),
    inject: [Connection],
  },
];

const serviceProviders: Provider[] = [
  {
    provide: InflowDITokens.CreateInflowService,
    useFactory: (
      vaccineCenterRepository: IVaccineCenterRepository,
      inflowRepository: IInflowRepository,
    ) => new CreateInflowService(vaccineCenterRepository, inflowRepository),
    inject: [
      VaccineCenterDITokens.IVaccineCenterRepository,
      InflowDITokens.IInflowRepository,
    ],
  },
  {
    provide: InflowDITokens.GetInflowBetweenDatesService,
    useFactory: (inflowRepository: IInflowRepository) =>
      new GetInflowBetweenDatesService(inflowRepository),
    inject: [InflowDITokens.IInflowRepository],
  },
];
@Module({
  providers: [...persistenceProvicer, ...serviceProviders],
  controllers: [InflowController],
})
export class InflowModule {}
