import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-password.dto';
import { UserEntity } from './entities/user.entity';
import { CODE_STATUS, ERROR_MESSAGE } from 'src/common/constants/http-errors';
import { PrismaService } from 'src/database/prisma-module/prisma.service';
import { convertMsToTimeStamp } from 'src/common/helpers/time-mappers';
import { USER_ERROR_MESSAGE } from './constant/error-message.constant';
import { HttpException } from '@nestjs/common/exceptions';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    // [SelfReview]: It's better create separate helper for this logic
    const timestamp = convertMsToTimeStamp(Date.now());
    const { login, password } = createUserDto;
    const newUser = {
      login,
      password,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    try {
      const user = await this.prisma.user.create({ data: newUser });
      return new UserEntity(user);
    } catch (error) {
      throw new HttpException(
        USER_ERROR_MESSAGE.UNIQUE_LOGIN,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return Array.from(users.map((user) => new UserEntity(user)));
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    // [SelfReview]: It's better throw an exception and catch it in the controller
    if (!user) {
      throw new HttpException(
        ERROR_MESSAGE[CODE_STATUS.NOT_FOUND]('User', id),
        HttpStatus.NOT_FOUND,
      );
    }

    return new UserEntity(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (user.password !== updateUserDto.oldPassword) {
      throw new HttpException(
        ERROR_MESSAGE[HttpStatus.FORBIDDEN](id),
        HttpStatus.FORBIDDEN,
      );
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { password: updateUserDto.newPassword, version: user.version + 1 },
    });

    return new UserEntity(updatedUser);
  }

  async remove(id: string) {
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch {
      throw new HttpException(
        ERROR_MESSAGE[HttpStatus.NOT_FOUND]('User', id),
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
