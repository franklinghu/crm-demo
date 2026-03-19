import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: { email: string; password: string }) {
    const result = await this.authService.login(dto);
    return {
      code: 0,
      data: result,
      timestamp: Date.now(),
    };
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Body() dto: { email: string; password: string; name: string }) {
    const result = await this.authService.register(dto);
    return {
      code: 0,
      data: result,
      timestamp: Date.now(),
    };
  }
}
