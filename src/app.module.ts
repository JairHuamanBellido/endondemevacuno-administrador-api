import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './infrastructure/database/database.module';
import { AuthenticationModule } from './application/auth/authentication.module';
import { ResponsableModule } from './application/responsable/responsable.module';

@Module({
  imports: [DatabaseModule, AuthenticationModule, ResponsableModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
