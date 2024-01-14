import { Global, Module } from '@nestjs/common';
import { PrismaMongoService } from './prisma-mongo.service';
import { PrismaMysqlService } from './prisma-mysql.service';
@Global()
@Module({
  providers: [PrismaMongoService, PrismaMysqlService],
  exports: [PrismaMongoService, PrismaMysqlService],
})
export class PrismaModule {}
