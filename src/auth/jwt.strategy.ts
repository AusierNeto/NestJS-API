import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

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
  async validate(payload: any) {
    // O que retornarmos aqui vai virar o 'req.user' que usamos no Controller!
    return { sub: payload.sub, email: payload.user };
  }
}