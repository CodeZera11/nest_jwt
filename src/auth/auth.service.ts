import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async signUp(authDto: AuthDto) {
    const { email, password } = authDto;
    const hashedPassword = await this.hashPassword(password);
    return await this.prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });
  }

  async signIn(authDto: AuthDto) {
    const { email, password } = authDto;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new ForbiddenException('User not found!');

    const passwordMatches = await this.matchPasswords(
      password,
      user.hashedPassword,
    );

    if (!passwordMatches) throw new ForbiddenException('Invalid Credentials!');

    return 'signed in';
  }

  signOut() {
    return 'signed out';
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async matchPasswords(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }
}
