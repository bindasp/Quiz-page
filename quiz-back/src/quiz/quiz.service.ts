import { Injectable } from '@nestjs/common';
import { PrismaMongoService } from '../prisma/prisma-mongo.service';
import { QuizMongo } from '@prisma/clientMongo';
import { PrismaMysqlService } from '../prisma/prisma-mysql.service';

@Injectable({})
export class QuizService {
  constructor(
    private prismaMongoService: PrismaMongoService,
    private prismaMysqlService: PrismaMysqlService,
  ) {}

  async saveQuiz(userId: number, quiz: QuizMongo) {
    const categoryNames = quiz.category.map((c) => c.toString());
    delete quiz.category;
    const categories = await this.prismaMysqlService.category.findMany({
      where: {
        categoryName: {
          in: categoryNames,
        },
      },
      select: {
        id: true,
      },
    });
    const savedQuiz = await this.prismaMongoService.quizMongo.create({
      data: quiz,
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
      },
    });

    const categoryIdsToAssign = categories.map((category) => ({
      id: category.id,
    }));

    return this.prismaMysqlService.quizMySQL.create({
      data: {
        mongoId: savedQuiz.id,
        userId: userId,
        categories: {
          create: categories.map((category) => ({
            category: { connect: { id: category.id } },
          })),
        },
      },
    });
  }

  async getQuizById(id: string) {
    const quizMongo = await this.prismaMongoService.quizMongo.findUnique({
      where: {
        id: id,
      },
      select: {
        questions: true,
      },
    });

    return quizMongo;
  }

  async getRandomQuiz(amount: number, category: string) {
    const quizMySQL = await this.prismaMysqlService.quizMySQL.findMany({
      take: amount,
      where: {
        categories: {
          some: { category: { categoryName: { contains: category } } },
        },
      },
      select: {
        mongoId: true,
        categories: {
          select: {
            category: true,
          },
        },
      },
    });

    const mongoIds = quizMySQL.map((quiz) => quiz.mongoId);

    const quizMongo = await this.prismaMongoService.quizMongo.findMany({
      where: {
        id: { in: mongoIds },
      },
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
      },
    });

    quizMongo.forEach((q) => {
      const matchingQuizMySQL = quizMySQL.find((qm) => qm.mongoId === q.id);

      if (matchingQuizMySQL) {
        q.category = matchingQuizMySQL.categories.map(
          (c) => c.category.categoryName,
        );
      }
    });
    return quizMongo;
  }

  async getUserQuiz(userId: number, category: string) {
    const quizMySQL = await this.prismaMysqlService.quizMySQL.findMany({
      where: {
        userId: userId,
        categories: {
          some: { category: { categoryName: { contains: category } } },
        },
      },
      select: {
        mongoId: true,
        categories: {
          select: {
            category: true,
          },
        },
      },
    });
    const mongoIds = quizMySQL.map((quiz) => quiz.mongoId);

    const quizMongo = await this.prismaMongoService.quizMongo.findMany({
      where: {
        id: { in: mongoIds },
      },
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
      },
    });

    quizMongo.forEach((q) => {
      const matchingQuizMySQL = quizMySQL.find((qm) => qm.mongoId === q.id);

      if (matchingQuizMySQL) {
        q.category = matchingQuizMySQL.categories.map(
          (c) => c.category.categoryName,
        );
      }
    });

    return quizMongo;
  }

  async deleteQuiz(userId: number, id: string) {
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

  async updateQuiz(id: string, quiz: QuizMongo) {
    const categoryNames = quiz.category.map((c) => c.toString());
    delete quiz.category;
    const categories = await this.prismaMysqlService.category.findMany({
      where: {
        categoryName: {
          in: categoryNames,
        },
      },
      select: {
        id: true,
      },
    });

    const categoryIdsToAssign = categories.map((category) => category.id);

    const quizMySQLId = await this.prismaMysqlService.quizMySQL
      .findUnique({
        where: { mongoId: id },
        select: { id: true },
      })
      .then((id) => id.id);

    await this.prismaMysqlService.quizCategory.deleteMany({
      where: {
        quizId: quizMySQLId,
      },
    });

    for (const categoryId of categoryIdsToAssign) {
      await this.prismaMysqlService.quizCategory.create({
        data: {
          quizId: quizMySQLId,
          categoryId: categoryId,
        },
      });
    }

    return await this.prismaMongoService.quizMongo.update({
      where: { id: id },
      data: quiz,
    });
  }
}
