import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() authDto: AuthDto) {
    return this.authService.signUp(authDto);
  }

  @Post('signin')
  signIn(@Body() authDto: AuthDto) {
    return this.authService.signIn(authDto);
  }

  @Get('signout')
  signOut() {
    return this.authService.signOut();
  }
}
