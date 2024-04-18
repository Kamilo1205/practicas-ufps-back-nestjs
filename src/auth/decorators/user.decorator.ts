import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  return req.user; // puedes acceder a cualquier propiedad del usuario aquí, por ejemplo, req.user.id
});
