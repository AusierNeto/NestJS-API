import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/user/entities/user.entity';

// Decorator personalizado para extrair o usuário autenticado do request
export const GetUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): User => {
    // 1. Tipamos a constante request explicitamente
    // Usamos uma interseção (&) para dizer: "é um Request do Express QUE TEM um .user"
    const request = ctx.switchToHttp().getRequest<Request & { user: User }>();

    return request.user;
  },
);
