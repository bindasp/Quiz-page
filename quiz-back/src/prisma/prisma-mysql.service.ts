import { Injectable } from '@nestjs/common';
import { PrismaClient as PrismaMysqlClient } from '@prisma/clientMysql';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaMysqlService extends PrismaMysqlClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('MYSQL_URL'),
        },
      },
    });
  }
}
