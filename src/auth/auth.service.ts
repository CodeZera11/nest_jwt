import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async signUp(authDto: AuthDto) {
    const { email, password } = authDto;
    const hashedPassword = await this.hashPassword(password);
    return this.prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });
  }

  signIn() {
    return 'signed in';
  }

  signOut() {
    return 'signed out';
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }
}
