import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth-dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() authDto: AuthDto, @Res() res: Response) {
    return this.authService.signUp(authDto, res);
  }

  @Post('signin')
  signIn(@Body() authDto: AuthDto, @Res() res: Response) {
    return this.authService.signIn(authDto, res);
  }

  @Get('signout')
  signOut(@Res() res: Response) {
    return this.authService.signOut(res);
  }
}
