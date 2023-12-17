import { DataSource } from 'typeorm';

import { isDevelopmentEnvironment } from '../../../commons/helpers/is-development-environment';

export const typeOrmConnectionSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  port: Number(process.env.POSTGRES_PORT),
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [__dirname + '/../../../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  migrationsRun: !isDevelopmentEnvironment(),
});
