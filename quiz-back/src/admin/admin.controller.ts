import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { RoleGuard } from '../auth/role.guard';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('/user')
  @UseGuards(RoleGuard)
  getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Delete('/user/:id')
  @UseGuards(RoleGuard)
  deleteUser(@Param('id') id: string) {
    return this.adminService.deleteUser(parseInt(id));
  }

  @Get('/quiz')
  @UseGuards(RoleGuard)
  getAllQuizzes() {
    return this.adminService.getAllQuizzes();
  }

  @Delete('/quiz/:id')
  @UseGuards(RoleGuard)
  deleteQuiz(@Param('id') id: string) {
    return this.adminService.deleteQuiz(id);
  }
}
