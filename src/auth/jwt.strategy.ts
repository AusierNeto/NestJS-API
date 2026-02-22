import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';

interface JwtPayload {
  id: number;
  user: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 1. Onde procurar o token? (No cabeçalho 'Authorization' como 'Bearer')
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // 2. Qual é a chave para abrir? (A MESMA que você usou no AuthModule)
      secretOrKey: 'secret_placeholder_only_for_dev',
    });
  }

  // 3. O que fazer depois de abrir o token?
  validate(payload: JwtPayload) {
    // O que retornarmos aqui vai virar o 'req.user' que usamos no Controller!
    return { id: payload.id, email: payload.user };
  }
}
