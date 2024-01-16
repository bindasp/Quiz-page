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
import { IsAdmin } from './admin.decorator.tx';

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
  signin(
    @UserID() userId: string,
    @IsAdmin() isAdmin: boolean,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = this.tokenService.createToken(userId, isAdmin);
    res.cookie('access-token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });
    res.cookie('is-logged', true, {
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });
    res.cookie('is-admin', isAdmin, {
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });
  }

  @Post('signout')
  signout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access-token');
    res.clearCookie('is-logged');
    res.clearCookie('is-admin');
  }

  @Get('/me')
  @UseGuards(TokenGuard)
  async me(@UserID() userId: string) {
    return this.authService.me(userId);
  }
}
