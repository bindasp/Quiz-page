import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { Quiz } from '@prisma/client';

@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}
  @Get(':id')
  hello(@Param('id') id: string) {
    return this.quizService.getQuizById(id);
  }

  @Post()
  saveQuiz(@Body() quiz: Quiz) {
    return this.quizService.saveQuiz(quiz);
  }
}
