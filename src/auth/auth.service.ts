import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  signUp() {
    return this.prisma.user.create({
      data: {
        email: 'bhaveshy737@gmail.com',
        hashedPassword: 'Captaingogo007@',
      },
    });
  }
}
