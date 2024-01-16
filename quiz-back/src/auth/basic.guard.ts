import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { User } from '@prisma/client';
@Injectable()
export class BasicGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  private decodeAuthHeader(header: string) {
    const b64auth = header.split(' ')[1];
    if (!b64auth) return undefined;
    const decode = Buffer.from(b64auth, 'base64').toString().split(':');
    if (decode.length != 2) return undefined;
    return {
      login: decode[0],
      password: decode[1],
    };
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const auth = request.headers['authorization'];
    if (!auth) return false;
    const { login, password } = this.decodeAuthHeader(auth);
    if (!login || !password) return false;

    const dto: LoginDto = { login: login, password: password };
    const user = await this.authService.signin(dto);

    if (!user) return false;
    request.userId = user.id;
    request.isAdmin = user.isAdmin;
    return true;
  }
}
