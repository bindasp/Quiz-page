import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaMongoService } from '../prisma/prisma-mongo.service';
import { User } from '@prisma/client';
import * as process from 'process';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { LoginDto } from './dto/login.dto';
import { PrismaMysqlService } from '../prisma/prisma-mysql.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaMongoService: PrismaMongoService,
    private prismaMysqlService: PrismaMysqlService,
  ) {}
  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    try {
      return await this.prismaMysqlService.user.create({
        data: {
          email: dto.email,
          login: dto.login,
          password: hash,
        },
        select: {
          id: true,
          login: true,
        },
      });
    } catch (e) {
      if (e.code == 'P2002') throw new ConflictException('Credentials taken');
    }
  }
  async signin(dto: LoginDto) {
    const user = await this.prismaMysqlService.user.findUnique({
      where: { login: dto.login },
      select: { id: true, login: true, password: true, isAdmin: true },
    });
    if (!user) throw new ForbiddenException('Credentials incorrect');

    const pwMatches = await argon.verify(user.password, dto.password);
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');
    delete user.password;

    return user;
  }

  me(userId: string) {
    return this.prismaMysqlService.user.findUnique({
      where: { id: parseInt(userId) },
      select: { id: true, login: true, email: true },
    });
  }
}
