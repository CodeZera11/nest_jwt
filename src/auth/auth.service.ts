import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth-dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/constants';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async signUp(authDto: AuthDto, res: Response) {
    const { email, password } = authDto;
    const hashedPassword = await this.hashPassword(password);

    const existingUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) throw new ForbiddenException('User already exists');
    const user = await this.prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });

    const payload = { id: user.id, email: user.email };

    const token = await this.generateToken(payload);

    res.cookie('token', token);

    return res.send({ token });
  }

  async signIn(authDto: AuthDto, res: Response) {
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

    const payload = { id: user.id, email: user.email };

    const token = await this.generateToken(payload);

    if (!token) throw new ForbiddenException('Something went wrong!');

    res.cookie('token', token);

    return res.send({ user, token });
  }

  signOut(res: Response) {
    res.clearCookie('token');
    return res.send({ message: 'Signed Out' });
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async matchPasswords(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  async generateToken(payload: { id: number; email: string }) {
    return await this.jwt.signAsync(payload, { secret: JWT_SECRET });
  }
}
