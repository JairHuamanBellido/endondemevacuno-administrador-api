import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './infrastructure/database/database.module';
import { AuthenticationModule } from './application/auth/authentication.module';
import { ResponsableModule } from './application/responsable/responsable.module';
import { VaccineCenterModule } from './application/vaccine-center/vaccine-center.module';
import { UbigeoModule } from './application/ubigeo/ubigeo.module';
import { VaccinesModule } from './application/vaccines/vaccines.module';

@Module({
  imports: [
    DatabaseModule,
    AuthenticationModule,
    ResponsableModule,
    VaccineCenterModule,
    UbigeoModule,
    VaccinesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
