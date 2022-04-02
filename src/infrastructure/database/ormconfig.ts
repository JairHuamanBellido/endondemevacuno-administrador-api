import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { DatabaseConfig } from '../config/DatabaseConfig';

export const ormconfig: TypeOrmModuleAsyncOptions = {
  useFactory: async () => {
    if (process.env.NODE_ENV !== 'development') {
      const databaseConfig = new DatabaseConfig();
      const {
        EnDondeMeVacunoDatabaseHost,
        EnDondeMeVacunoDatabaseName,
        EnDondeMeVacunoDatabasePassword,
        EnDondeMeVacunoDatabaseUser,
      } = await databaseConfig.getCredentials();
      return await {
        type: 'postgres',
        host: EnDondeMeVacunoDatabaseHost,
        port: 5432,
        username: EnDondeMeVacunoDatabaseUser,
        password: EnDondeMeVacunoDatabasePassword,
        database: EnDondeMeVacunoDatabaseName,
        entities: [__dirname + '/entity/**/*{.ts,.js}'],
        logging: false,
        migrationsRun: false,
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
        migrationsTransactionMode: 'all',
        cli: {
          migrationsDir: 'src/infrastructure/database/migrations',
        },
      };
    }
    return await {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
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
