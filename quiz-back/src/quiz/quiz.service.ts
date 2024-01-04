import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Quiz } from '@prisma/client';

@Injectable({})
export class QuizService {
  constructor(private prisma: PrismaService) {}

  saveQuiz(quiz: Quiz) {
    return this.prisma.quiz.create({ data: quiz });
  }

  getQuizById(id: string) {
    return this.prisma.quiz.findUnique({
      where: {
        id: id,
      },
    });
  }
}
