import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { AuthDto } from './dto';
import { LoginDto } from './dto/login.dto';
import { BasicGuard } from './basic.guard';
import { UserID } from './user.decorator';
import { TokenService } from '../token/token.service';
import { Response } from 'express';
import { TokenGuard } from './token.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
  ) {}

  @Post('signup')
  signup(@Body() authDto: AuthDto) {
    return this.authService.signup(authDto);
  }

  @Post('signin')
  @UseGuards(BasicGuard)
  signin(@UserID() userId: string, @Res({ passthrough: true }) res: Response) {
    const token = this.tokenService.createToken(userId);
    res.cookie('access-token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });
    res.cookie('is-logged', true, {
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });
  }

  @Post('signout')
  signout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access-token');
    res.clearCookie('is-logged');
  }

  @Get('/me')
  @UseGuards(TokenGuard)
  async me(@UserID() userId: string) {
    return this.authService.me(userId);
  }
}
