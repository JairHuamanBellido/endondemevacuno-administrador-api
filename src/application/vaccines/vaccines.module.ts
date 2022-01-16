import { VaccineDITokens } from '@domain/Vaccine/di/VaccineDITokens';
import { IVaccineRepository } from '@domain/Vaccine/interface/IVaccineRepository';
import { GetAllVacinesService } from '@domain/Vaccine/services/GetAllVacinesService';
import { TypeOrmVaccineRepository } from '@infrastructure/database/repositories/VaccineRepository';
import { Module, Provider } from '@nestjs/common';
import { Connection } from 'typeorm';
import { VaccinesController } from './controller/vaccines.controller';

const persistencerProviders: Provider[] = [
  {
    provide: VaccineDITokens.IVaccineRepository,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(TypeOrmVaccineRepository),
    inject: [Connection],
  },
];

const serviceProviders: Provider[] = [
  {
    provide: VaccineDITokens.GetAllVacinesService,
    useFactory: (vaccineRepository: IVaccineRepository) =>
      new GetAllVacinesService(vaccineRepository),
    inject: [VaccineDITokens.IVaccineRepository],
  },
];
@Module({
  providers: [...persistencerProviders, ...serviceProviders],
  controllers: [VaccinesController],
})
export class VaccinesModule {}
