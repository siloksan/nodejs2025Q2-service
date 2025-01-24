import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-password.dto';
import { UserEntity } from './entities/user.entity';
import { CODE_STATUS, ERROR_MESSAGE } from 'src/common/constants/http-errors';
import { PrismaService } from 'src/database/prisma-module/prisma.service';
import { convertMsToTimeStamp } from 'src/common/helpers/time-mappers';
import { USER_ERROR_MESSAGE } from './constant/error-message.constant';
import { HttpException } from '@nestjs/common/exceptions';
import { compare, genSalt, hash } from 'bcrypt';
import { Prisma } from '@prisma/client';
import {
  UserSearchProperty,
  USER_SEARCH_PROPERTIES,
} from 'src/common/constants/user-search-properties';

@Injectable()
export class UsersService {
  private readonly roundSalt = Number(process.env.CRYPT_SALT) || 10;

  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    // [SelfReview]: It's better create separate helper for this logic
    const timestamp = convertMsToTimeStamp(Date.now());
    const { login, password } = createUserDto;

    try {
      const hashedPassword = await this.hashPassword(password, this.roundSalt);
      const newUser = {
        login,
        password: hashedPassword,
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      const user = await this.prisma.user.create({ data: newUser });

      return new UserEntity(user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return Array.from(users.map((user) => new UserEntity(user)));
  }

  async findOne(key: UserSearchProperty, value: string) {
    const where = {} as Prisma.UserWhereUniqueInput;
    where[key] = value;
    const user = await this.prisma.user.findUnique({
      where,
    });

    // [SelfReview]: It's better throw an exception and catch it in the controller
    if (!user) {
      throw new HttpException(
        ERROR_MESSAGE[CODE_STATUS.NOT_FOUND]('User', value),
        HttpStatus.NOT_FOUND,
      );
    }

    return new UserEntity(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(USER_SEARCH_PROPERTIES.ID, id);
    const isValidPassword = await this.verifyPassword(
      updateUserDto.oldPassword,
      user.password,
    );

    if (!isValidPassword) {
      throw new HttpException('Invalid old password', HttpStatus.FORBIDDEN);
    }

    const newHashedPassword = await this.hashPassword(
      updateUserDto.newPassword,
      this.roundSalt,
    );

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { password: newHashedPassword, version: user.version + 1 },
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

  private async hashPassword(password: string, saltRound: number) {
    try {
      const salt = await genSalt(saltRound);
      const hashedPassword = await hash(password, salt);

      return hashedPassword;
    } catch (error) {
      throw new Error(`Failed to hash password`);
    }
  }

  async verifyPassword(password: string, hashedPassword: string) {
    return await compare(password, hashedPassword);
  }
}
