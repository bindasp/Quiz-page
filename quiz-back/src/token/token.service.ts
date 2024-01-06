import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}
  createToken(userId: string): string {
    return this.jwtService.sign({ sub: userId }, { expiresIn: '1h' });
  }

  verifyToken(token: string): { sub: string } {
    return this.jwtService.verify(token);
  }
}
