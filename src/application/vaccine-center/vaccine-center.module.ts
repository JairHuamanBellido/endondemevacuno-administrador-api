import { InventoryDITokens } from '@domain/Inventory/di/InventoryDITokens';
import { IIventoryRepository } from '@domain/Inventory/interface/IIventoryRepository.interface';
import { CreateInventoryService } from '@domain/Inventory/services/CreateInventoryService';
import { DeleteVaccineToInventoryService } from '@domain/Inventory/services/DeleteVaccineFromInventoryService';
import { GetInvetoryByVaccineCenterService } from '@domain/Inventory/services/GetInvetoryByVaccineCenterService';
import { ResponsableDITokens } from '@domain/Responsable/di/ResponsableDITokens';
import { IResponsableRepository } from '@domain/Responsable/interface/IReponsableRepository.interface';
import { FlagCreateVaccinationCenterService } from '@domain/Responsable/service/FlagCreateVaccinationCenterService';
import { UbigeoDITokens } from '@domain/Ubigeo/di/UbigeoDITokens';
import { IUbigeoRepository } from '@domain/Ubigeo/interface/IUbigeoRepository.interface';
import { VaccineDITokens } from '@domain/Vaccine/di/VaccineDITokens';
import { IVaccineRepository } from '@domain/Vaccine/interface/IVaccineRepository';
import { VaccineCenterDITokens } from '@domain/VaccineCenter/di/VaccineCenterDITokens';
import { IVaccineCenterRepository } from '@domain/VaccineCenter/interface/IVaccineCenterRepository.interface';
import { IVaccineCenterRepositoryDynamoDB } from '@domain/VaccineCenter/interface/IvaccineCenterRepositoryDynamoDB.interface';
import { CreateVaccineCenterService } from '@domain/VaccineCenter/service/CreateVaccineCenterService';
import { GetVaccineCenterByResponsableService } from '@domain/VaccineCenter/service/GetVaccineCenterByResponsableService';
import { UpdateVaccineCenterService } from '@domain/VaccineCenter/service/UpdateVaccineCenterService';
import { TypeOrmInventoryRepository } from '@infrastructure/database/repositories/IventoryRepository';
import { TypeormResponsableRepository } from '@infrastructure/database/repositories/ResponsableRepository';
import { TypeOrmUbigeoRepository } from '@infrastructure/database/repositories/UbigeoRepository';
import { TypeormVaccinateCenterRepository } from '@infrastructure/database/repositories/VaccineCenterRepository';
import { VaccineCenterRepositoryDynamoDB } from '@infrastructure/database/repositories/VaccineCenterRepositoryDynamoDB';
import { TypeOrmVaccineRepository } from '@infrastructure/database/repositories/VaccineRepository';
import { Module, Provider } from '@nestjs/common';
import { Connection } from 'typeorm';
import { VaccineCenterController } from './controller/vaccine-center.controller';

const persistenceProvicer: Provider[] = [
  {
    provide: VaccineCenterDITokens.IVaccineCenterRepository,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(TypeormVaccinateCenterRepository),
    inject: [Connection],
  },
  {
    provide: ResponsableDITokens.IResponsableRepository,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(TypeormResponsableRepository),
    inject: [Connection],
  },
  {
    provide: UbigeoDITokens.IUbigeoRepository,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(TypeOrmUbigeoRepository),
    inject: [Connection],
  },
  {
    provide: InventoryDITokens.IIventoryRepository,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(TypeOrmInventoryRepository),
    inject: [Connection],
  },
  {
    provide: VaccineDITokens.IVaccineRepository,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(TypeOrmVaccineRepository),
    inject: [Connection],
  },
  {
    provide: VaccineCenterDITokens.IVaccineCenterRepositoryDynamoDB,
    useFactory: () => new VaccineCenterRepositoryDynamoDB(),
  },
];

const serviceProviders: Provider[] = [
  {
    provide: ResponsableDITokens.FlagCreateVaccinationCenterService,
    useFactory: (
      responsableRepository: IResponsableRepository,
      vaccineCenterRepository: IVaccineCenterRepository,
    ) =>
      new FlagCreateVaccinationCenterService(
        responsableRepository,
        vaccineCenterRepository,
      ),
    inject: [
      ResponsableDITokens.IResponsableRepository,
      VaccineCenterDITokens.IVaccineCenterRepository,
    ],
  },
  {
    provide: InventoryDITokens.CreateInventoryService,
    useFactory: (
      inventoryRepository: IIventoryRepository,
      vaccineRepository: IVaccineRepository,
      vaccineCenterRepository: IVaccineCenterRepository,
      vaccineCenterRepositoryDynamoDB: IVaccineCenterRepositoryDynamoDB,
    ) =>
      new CreateInventoryService(
        inventoryRepository,
        vaccineRepository,
        vaccineCenterRepository,
        vaccineCenterRepositoryDynamoDB,
      ),
    inject: [
      InventoryDITokens.IIventoryRepository,
      VaccineDITokens.IVaccineRepository,
      VaccineCenterDITokens.IVaccineCenterRepository,
      VaccineCenterDITokens.IVaccineCenterRepositoryDynamoDB,
    ],
  },
  {
    provide: VaccineCenterDITokens.CreateVaccineCenterService,
    useFactory: (
      vaccineCenterRepository: IVaccineCenterRepository,
      ubigeoRepository: IUbigeoRepository,
      responsableRepository: IResponsableRepository,
      flagCreateVaccineCenter: FlagCreateVaccinationCenterService,
      createInventoryService: CreateInventoryService,
      vaccineCenterRepositoryDynamoDB: IVaccineCenterRepositoryDynamoDB,
    ) =>
      new CreateVaccineCenterService(
        vaccineCenterRepository,
        ubigeoRepository,
        responsableRepository,
        flagCreateVaccineCenter,
        createInventoryService,
        vaccineCenterRepositoryDynamoDB,
      ),
    inject: [
      VaccineCenterDITokens.IVaccineCenterRepository,
      UbigeoDITokens.IUbigeoRepository,
      ResponsableDITokens.IResponsableRepository,
      ResponsableDITokens.FlagCreateVaccinationCenterService,
      InventoryDITokens.CreateInventoryService,
      VaccineCenterDITokens.IVaccineCenterRepositoryDynamoDB,
    ],
  },
  {
    provide: VaccineCenterDITokens.UpdateVaccineCenterService,
    useFactory: (
      vaccineCenterRepository: IVaccineCenterRepository,
      vaccineCenterRepositoryDynamoDB: IVaccineCenterRepositoryDynamoDB,
    ) =>
      new UpdateVaccineCenterService(
        vaccineCenterRepository,
        vaccineCenterRepositoryDynamoDB,
      ),
    inject: [
      VaccineCenterDITokens.IVaccineCenterRepository,
      VaccineCenterDITokens.IVaccineCenterRepositoryDynamoDB,
    ],
  },
  {
    provide: VaccineCenterDITokens.GetVaccineCenterByResponsableService,
    useFactory: (vaccineCenterRepository: IVaccineCenterRepository) =>
      new GetVaccineCenterByResponsableService(vaccineCenterRepository),
    inject: [VaccineCenterDITokens.IVaccineCenterRepository],
  },
  {
    provide: InventoryDITokens.GetInvetoryByVaccineCenterService,
    useFactory: (inventoryRepository: IIventoryRepository) =>
      new GetInvetoryByVaccineCenterService(inventoryRepository),
    inject: [InventoryDITokens.IIventoryRepository],
  },
  {
    provide: InventoryDITokens.DeleteVaccineToInventoryService,
    useFactory: (
      inventoryRepository: IIventoryRepository,
      vaccineCenterRepository: IVaccineCenterRepository,
      vaccineCenterRepositoryDynamoDB: IVaccineCenterRepositoryDynamoDB,
    ) =>
      new DeleteVaccineToInventoryService(
        inventoryRepository,
        vaccineCenterRepository,
        vaccineCenterRepositoryDynamoDB,
      ),
    inject: [
      InventoryDITokens.IIventoryRepository,
      VaccineCenterDITokens.IVaccineCenterRepository,
      VaccineCenterDITokens.IVaccineCenterRepositoryDynamoDB,
    ],
  },
];

@Module({
  providers: [...persistenceProvicer, ...serviceProviders],
  controllers: [VaccineCenterController],
})
export class VaccineCenterModule {}
