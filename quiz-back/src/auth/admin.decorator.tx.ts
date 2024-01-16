import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const IsAdmin = createParamDecorator<boolean>(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.isAdmin;
  },
);
