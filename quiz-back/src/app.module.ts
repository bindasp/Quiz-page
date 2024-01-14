import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { QuizModule } from './quiz/quiz.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from './token/token.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    QuizModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TokenModule,
    CategoryModule,
  ],
})
export class AppModule {}
