import { Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authSerice: AuthService) {}

  @Post('/login')
  async login(@Request() req) {
    return this.authSerice.login(req.body);
  }
}
