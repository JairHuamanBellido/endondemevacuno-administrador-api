import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { DatabaseConfig } from '../config/DatabaseConfig';

export const ormconfig: TypeOrmModuleAsyncOptions = {
  useFactory: async () => {
    const databaseConfig = new DatabaseConfig();
    const {
      EnDondeMeVacunoDatabaseHost,
      EnDondeMeVacunoDatabaseName,
      EnDondeMeVacunoDatabasePassword,
      EnDondeMeVacunoDatabaseUser,
    } = await databaseConfig.getCredentials();
    return await {
      type: 'postgres',
      host: process.env.DB_HOST || EnDondeMeVacunoDatabaseHost,
      port: 5432,
      username: process.env.DB_USERNAME || EnDondeMeVacunoDatabaseUser,
      password: process.env.DB_PASSWORD || EnDondeMeVacunoDatabasePassword,
      database: process.env.DB_NAME || EnDondeMeVacunoDatabaseName,
      entities: [__dirname + '/entity/**/*{.ts,.js}'],
      logging: false,
      migrationsRun: false,
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      migrationsTransactionMode: 'all',
      cli: {
        migrationsDir: 'src/infrastructure/database/migrations',
      },
    };
  },
};
