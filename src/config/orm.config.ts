import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { DataSource, DataSourceOptions } from 'typeorm';

ConfigModule.forRoot({
  isGlobal: true,
  load: [configuration],
});

export default new DataSource({
  ...(configuration().database as DataSourceOptions),
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['deploy/migrations/*{.ts,.js}'],
});
