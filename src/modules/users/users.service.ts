import { Injectable } from '@nestjs/common';
import { db } from 'src/database';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-password.dto';
import { UserEntity } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { CODE_STATUS } from 'src/common/constants/http-errors';

@Injectable()
export class UsersService {
  private readonly users = db.users;
  create(createUserDto: CreateUserDto) {
    const id = uuidv4();
    const timestamp = Date.now();
    const newUser: UserEntity = {
      id,
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    this.users.set(id, newUser);

    return new UserEntity(newUser);
  }

  findAll() {
    return Array.from(this.users.values()).map((user) => new UserEntity(user));
  }

  findOne(id: string) {
    const user = this.users.get(id);

    if (!user) {
      return { status: CODE_STATUS.NOT_FOUND };
    }

    return new UserEntity(this.users.get(id));
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.users.get(id);

    if (!user) {
      return { status: CODE_STATUS.NOT_FOUND };
    }

    if (user.password !== updateUserDto.oldPassword) {
      return { status: CODE_STATUS.FORBIDDEN };
    }

    user.password = updateUserDto.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();

    return new UserEntity(user);
  }

  remove(id: string) {
    if (!this.users.has(id)) {
      return { status: CODE_STATUS.NOT_FOUND };
    }

    this.users.delete(id);
  }
}
