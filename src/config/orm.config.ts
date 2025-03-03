import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import * as path from "path";

export default (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  replication: {
    master: {
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USERNAME'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_NAME'),
    },
    slaves: [
      {
        host: configService.get<string>('DB_REPLICA_HOST'),
        port: configService.get<number>('DB_REPLICA_PORT'),
        username: configService.get<string>('DB_REPLICA_USERNAME'),
        password: configService.get<string>('DB_REPLICA_PASSWORD'),
        database: configService.get<string>('DB_REPLICA_NAME'),
      },
    ],
  },
  entities: [path.join(__dirname, '..', 'modules', '**', '*.entity.js')],
  synchronize: true,
  logging: true,
});
