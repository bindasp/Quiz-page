import { Injectable } from '@nestjs/common';
import { PrismaMongoService } from '../prisma/prisma-mongo.service';
import { PrismaMysqlService } from '../prisma/prisma-mysql.service';

@Injectable()
export class AdminService {
  constructor(
    private prismaMongoService: PrismaMongoService,
    private prismaMysqlService: PrismaMysqlService,
  ) {}
  getAllUsers() {
    return this.prismaMysqlService.user.findMany({
      select: { id: true, email: true, login: true },
    });
  }

  async deleteUser(id: number) {
    const quizzesMySQL = await this.prismaMysqlService.quizMySQL.findMany({
      where: { userId: id },
    });

    const mongoIds = quizzesMySQL.map((q) => q.mongoId);

    for (const quiz of quizzesMySQL) {
      await this.prismaMysqlService.quizCategory.deleteMany({
        where: { quizId: quiz.id },
      });

      await this.prismaMysqlService.quizMySQL.delete({
        where: { id: quiz.id },
      });
    }

    // Usuń każdy quiz w bazie MongoDB
    for (const quizId of mongoIds) {
      await this.prismaMongoService.quizMongo.delete({
        where: { id: quizId },
      });
    }

    // Usuń użytkownika
    await this.prismaMysqlService.user.delete({
      where: { id: id },
    });
  }

  getAllQuizzes() {
    return this.prismaMongoService.quizMongo.findMany({
      select: {
        id: true,
        title: true,
        description: true,
      },
    });
  }

  async deleteQuiz(id: string) {
    const mysqlId = await this.prismaMysqlService.quizMySQL
      .findUnique({
        where: { mongoId: id },
        select: { id: true },
      })
      .then((r) => r?.id);

    await this.prismaMysqlService.quizCategory.deleteMany({
      where: { quizId: mysqlId },
    });

    await this.prismaMysqlService.quizMySQL.delete({
      where: { mongoId: id },
    });

    await this.prismaMongoService.quizMongo.delete({
      where: { id: id },
    });
  }
}
