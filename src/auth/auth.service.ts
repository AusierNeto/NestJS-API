import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(user: any) {
    const payload: object = {'user': user.email, 'sub': user.id};
    const token: string = this.jwtService.sign(payload);

    return {'access_token': token};
  }
}
