import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { QuizModule } from './quiz/quiz.module';

@Module({
  imports: [AuthModule, UserModule, QuizModule],
})
export class AppModule {}
