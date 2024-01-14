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

    /*const savedQuiz = await this.prismaMongoService.quiz.create({
      data: quiz,
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
      },
    });
    const createdQuiz = await this.prismaMysqlService.quiz.create({
      data: {
        mongoId: savedQuiz.id,
        userId: userId,
      },
    });
    return savedQuiz;*/
  }

  getQuizById(id: string) {
    return this.prismaMongoService.quizMongo.findUnique({
      where: {
        id: id,
      },
    });
  }

  getRandomQuiz(amount: number) {
    return this.prismaMongoService.quizMongo.findMany({ take: amount });
  }

  async getUserQuiz(userId: number) {
    const quizzes = await this.prismaMysqlService.user.findUnique({
      where: { id: userId },
      select: {
        quizzes: {
          select: {
            mongoId: true,
          },
        },
      },
    });
    const quizIds = quizzes.quizzes.map((quiz) => quiz.mongoId);
    //console.log(quizIds);
    return this.prismaMongoService.quizMongo.findMany({
      where: { id: { in: quizIds } },
      select: { id: true, title: true, description: true, category: true },
    });
  }

  async deleteQuiz(userId: string, id: string) {
    await this.prismaMysqlService.quizMySQL.deleteMany({
      where: { mongoId: id },
    });
    await this.prismaMongoService.quizMongo.delete({ where: { id: id } });
  }

  async updateQuiz(id: string, quiz: QuizMongo) {
    return await this.prismaMongoService.quizMongo.update({
      where: { id: id },
      data: quiz,
    });
  }
}
