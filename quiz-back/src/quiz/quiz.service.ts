import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Quiz, User } from '@prisma/client';

@Injectable({})
export class QuizService {
  constructor(private prisma: PrismaService) {}

  async saveQuiz(userId: string, quiz: Quiz) {
    const savedQuiz = await this.prisma.quiz.create({ data: quiz });
    await this.prisma.user.update({
      where: { id: userId },
      data: { quizId: { push: savedQuiz.id } },
    });
    return savedQuiz;
  }

  getQuizById(id: string) {
    return this.prisma.quiz.findUnique({
      where: {
        id: id,
      },
    });
  }

  getRandomQuiz(amount: number) {
    return this.prisma.quiz.findMany({ take: amount });
  }

  async getUserQuiz(userId: string) {
    const quizzes = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { quizId: true },
    });
    const quizIds = quizzes?.quizId || [];

    const quizTable: {
      id: string;
      title: string;
      description: string;
      category: string;
    }[] = [];
    return this.prisma.quiz.findMany({
      where: { id: { in: quizIds } },
      select: { id: true, title: true, description: true, category: true },
    });
  }
}
