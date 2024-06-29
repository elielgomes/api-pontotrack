import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const existisUser = await this.userRepository.findByEmail(
      createUserDto.email,
    );

    if (existisUser) {
      throw new ConflictException('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(createUserDto.password, salt);

    const newUser = new User({
      email: createUserDto.email,
      name: createUserDto.name,
      password: hashPassword,
    });

    const user = await this.userRepository.create(newUser);

    return {
      user: {
        ...user,
        password: undefined,
      },
    };
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  async findById(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return { ...user, password: undefined };
  }

  async delete(id: string) {
    return await this.userRepository.delete(id);
  }

  async update(updateUserDto: UpdateUserDto & { id: string }) {
    const user = await this.userRepository.findById(updateUserDto.id);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (updateUserDto.email && user.email !== updateUserDto.email) {
      const existisUser = await this.userRepository.findByEmail(
        updateUserDto.email,
      );

      if (existisUser) {
        throw new BadRequestException('Email already exists');
      }
    }

    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt(10);
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
    }

    const userObj = new User({
      ...user,
      ...updateUserDto,
      password: updateUserDto.password || user.password,
    });

    const updatedUser = await this.userRepository.update(userObj);
    return {
      ...updatedUser,
      password: undefined,
    };
  }

  async updatePassword(
    userId: string,
    { password, newPassword }: UpdatePasswordDto,
  ) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new BadRequestException('Invalid password');
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    const updatedUser = new User({
      ...user,
      password: hashPassword,
    });

    await this.userRepository.update(updatedUser);

    return {
      success: true,
      message: 'Password updated successfully',
    };
  }

  async ping() {
    await this.userRepository.findAll();
    return null;
  }
}
