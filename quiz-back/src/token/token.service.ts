import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}
  createToken(userId: string, isAdmin: boolean): string {
    console.log(isAdmin);
    return this.jwtService.sign(
      { sub: userId, isAdmin: isAdmin },
      { expiresIn: '1h' },
    );
  }

  verifyToken(token: string): { sub: string; isAdmin: boolean } {
    return this.jwtService.verify(token);
  }
}
