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
    console.log(categories);
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

  async getQuizById(id: string) {
    const quizMongo = await this.prismaMongoService.quizMongo.findUnique({
      where: {
        id: id,
      },
      select: {
        questions: true,
      },
    });
    /*const quizMySQL = await this.prismaMysqlService.quizMySQL.findUnique({
      where: { mongoId: id },
      select: {
        categories: {
          select: {
            category: true,
          },
        },
      },
    });
    quizMongo.category = quizMySQL.categories.map(
      (c) => c.category.categoryName,
    );*/

    return quizMongo;
  }

  async getRandomQuiz(amount: number, category: string) {
    /*const quizMongo = await this.prismaMongoService.quizMongo.findMany({
      take: amount,
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
      },
    });
    const quizMySQL = await this.prismaMysqlService.quizMySQL.findMany({
      where: { mongoId: { in: quizMongo.map((q) => q.id) } },
      select: {
        mongoId: true,
        categories: {
          select: {
            category: true,
          },
        },
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

    return quizMongo;*/
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
    console.log(quizMySQL);
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
    /*const quizzes = await this.prismaMysqlService.user.findUnique({
      where: {
        id: userId,
      },
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
    const quizMongo = await this.prismaMongoService.quizMongo.findMany({
      where: { id: { in: quizIds } },
      select: { id: true, title: true, description: true, category: true },
    });

    const quizMySQL = await this.prismaMysqlService.quizMySQL.findMany({
      where: { mongoId: { in: quizMongo.map((q) => q.id) } },
      select: {
        mongoId: true,
        categories: {
          select: {
            category: true,
          },
        },
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

    return quizMongo;*/
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
