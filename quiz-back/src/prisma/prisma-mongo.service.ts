import { Injectable } from '@nestjs/common';
import { PrismaClient as PrismaMongoClient } from '@prisma/clientMongo';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaMongoService extends PrismaMongoClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('MONGO_URL'),
        },
      },
    });
  }
}
