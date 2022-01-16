import { UbigeoDITokens } from '@domain/Ubigeo/di/UbigeoDITokens';
import { IUbigeoRepository } from '@domain/Ubigeo/interface/IUbigeoRepository.interface';
import { GetAllUbigeoService } from '@domain/Ubigeo/services/GetAllUbigeoService';
import { TypeOrmUbigeoRepository } from '@infrastructure/database/repositories/UbigeoRepository';
import { Module, Provider } from '@nestjs/common';
import { Connection } from 'typeorm';
import { UbigeoController } from './controller/ubigeo.controller';

const persistenProvider: Provider[] = [
  {
    provide: UbigeoDITokens.IUbigeoRepository,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(TypeOrmUbigeoRepository),
    inject: [Connection],
  },
];

const serviceProviders: Provider[] = [
  {
    provide: UbigeoDITokens.GetAllUbigeoService,
    useFactory: (ubigeoRepository: IUbigeoRepository) =>
      new GetAllUbigeoService(ubigeoRepository),
    inject: [UbigeoDITokens.IUbigeoRepository],
  },
];
@Module({
  providers: [...persistenProvider, ...serviceProviders],
  controllers: [UbigeoController],
})
export class UbigeoModule {}
