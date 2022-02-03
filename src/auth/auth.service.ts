import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(payload: any) {
    const { email, password } = payload;
    const result = await this.usersService.validateUser(email, password);

    if (result) {
      return {
        access_token: this.jwtService.sign(result),
      };
    }
    throw new UnauthorizedException();
  }
}
