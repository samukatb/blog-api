import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authSerice: AuthService) {}

  @Post('/login')
  async login(@Body() payload: AuthDto) {
    return this.authSerice.login(payload);
  }
}
