import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import * as process from 'process';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(dto: AuthDto) {
    const doesExist = await this.prisma.user.findMany({
      where: { OR: [{ email: dto.email }, { login: dto.login }] },
    });

    if (doesExist.length > 0) {
      throw new ForbiddenException('Credentials taken');
    }

    const hash = await argon.hash(dto.password);
    const user = await this.prisma.user.create({
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
    return user;
  }
  async signin(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { login: dto.login },
      select: { id: true, login: true, password: true },
    });
    if (!user) throw new ForbiddenException('Credentials incorrect');

    const pwMatches = await argon.verify(user.password, dto.password);
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');
    delete user.password;

    return user;
  }
}
