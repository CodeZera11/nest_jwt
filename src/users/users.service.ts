import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers() {
    const users = await this.prisma.user.findMany({
      select: { id: true, email: true },
    });

    if (!users.length) throw new NotFoundException('No users');

    return users;
  }

  async getOneUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new NotFoundException('No user with such id exists');

    return user;
  }

  async getProfile(id: number, req: Request) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException("This user doesn't exist");
    }

    const decodedUser = req.user as { email: string; id: number };

    if (decodedUser.id !== user.id) {
      throw new ForbiddenException('This is not your profile');
    }

    return { user };
  }
}
