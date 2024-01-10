import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { Quiz } from '@prisma/client';
import { BasicGuard } from '../auth/basic.guard';
import { AuthService } from '../auth/auth.service';
import { TokenGuard } from '../auth/token.guard';
import { UserID } from '../auth/user.decorator';

@Controller('quiz')
export class QuizController {
  constructor(
    private quizService: QuizService,
    private authService: AuthService,
  ) {}

  @Get('random')
  getRandomQuiz(@Query('amount') amount: string) {
    return this.quizService.getRandomQuiz(parseInt(amount));
  }
  @Get('/:id')
  @UseGuards(TokenGuard)
  hello(@Param('id') id: string) {
    return this.quizService.getQuizById(id);
  }

  @Post()
  @UseGuards(TokenGuard)
  saveQuiz(@UserID() userId: string, @Body() quiz: Quiz) {
    return this.quizService.saveQuiz(userId, quiz);
  }

  @Get()
  @UseGuards(TokenGuard)
  getUserQuiz(@UserID() userId: string) {
    return this.quizService.getUserQuiz(userId);
  }
  @Delete('/:id')
  @UseGuards(TokenGuard)
  deleteQuiz(@UserID() userId: string, @Param('id') id: string) {
    return this.quizService.deleteQuiz(userId, id);
  }

  @Patch('/:id')
  @UseGuards(TokenGuard)
  updateQuiz(@Param('id') id: string, @Body() quiz: Quiz) {
    return this.quizService.updateQuiz(id, quiz);
  }
}
