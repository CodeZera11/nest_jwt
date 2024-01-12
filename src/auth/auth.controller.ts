import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp() {
    return this.authService.signUp();
  }

  @Post('signin')
  signIn() {
    return { response: 'Signed in successfully' };
  }

  @Get('signout')
  signOut() {
    return { response: 'Signed out successfully' };
  }
}
