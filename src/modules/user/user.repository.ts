import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.prisma.user.create({
      data: createUserDto,
    });

    return newUser;
  }

  async delete(id: string) {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async update(data: User) {
    const user = await this.prisma.user.update({
      where: {
        id: data.id,
      },
      data,
    });

    return user;
  }
}
