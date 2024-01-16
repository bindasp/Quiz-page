import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { RoleGuard } from '../auth/role.guard';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Get()
  getAllCategories() {
    return this.categoryService.getAllCategories();
  }
}
