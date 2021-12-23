import { ResponsableDITokens } from '@domain/Responsable/di/ResponsableDITokens';
import { IResponsableRepository } from '@domain/Responsable/interface/IReponsableRepository.interface';
import { GetAllResponsableService } from '@domain/Responsable/service/GetAllResponsablesService';
import { TypeormResponsableRepository } from '@infrastructure/database/repositories/ResponsableRepository';
import { Module, Provider } from '@nestjs/common';
import { Connection } from 'typeorm';
import { ResponsablesController } from './controller/responsables.controller';

const persistenceProvider: Provider[] = [
  {
    provide: ResponsableDITokens.IResponsableRepository,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(TypeormResponsableRepository),
    inject: [Connection],
  },
];

const serviceProviders: Provider[] = [
  {
    provide: ResponsableDITokens.GetAllResponsablesService,
    useFactory: (responsableRepository: IResponsableRepository) =>
      new GetAllResponsableService(responsableRepository),
    inject: [ResponsableDITokens.IResponsableRepository],
  },
];
@Module({
  providers: [...persistenceProvider, ...serviceProviders],
  controllers: [ResponsablesController],
})
export class ResponsableModule {}
