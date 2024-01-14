import { Injectable } from '@nestjs/common';
import { PrismaMysqlService } from '../prisma/prisma-mysql.service';
import { Category } from '@prisma/clientMysql';

@Injectable()
export class CategoryService {
  constructor(private prismaMysqlService: PrismaMysqlService) {}
  async getAllCategories() {
    return this.prismaMysqlService.category.findMany();
  }
}
