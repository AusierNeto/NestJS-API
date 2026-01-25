import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(user: LoginDto) {
    const userRegister = await this.userService.findByEmail(user.email);
    if (await bcrypt.compare(user.password, userRegister.password)) {
      const payload: object = {'user': userRegister.email, 'sub': userRegister.id};
      const token: string = this.jwtService.sign(payload);
  
      return {'access_token': token};
    } else throw new UnauthorizedException();
  }
}
