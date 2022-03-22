import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormconfig } from './ormconfig';

@Module({
  imports: [TypeOrmModule.forRootAsync(ormconfig)],
})
export class DatabaseModule {}
