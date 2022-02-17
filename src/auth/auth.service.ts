import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(payload: AuthDto) {
    const result = await this.usersService.validateUser(
      payload.email,
      payload.password,
    );

    if (result) {
      return {
        access_token: this.jwtService.sign(result),
        email: payload.email,
      };
    }
    throw new UnauthorizedException();
  }
}
