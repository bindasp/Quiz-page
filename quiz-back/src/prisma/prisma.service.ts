import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'mongodb+srv://admin:admin@quizdb.xp9ermf.mongodb.net/QuizDB?retryWrites=true&w=majority',
        },
      },
    });
  }
}
