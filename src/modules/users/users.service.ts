import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { db } from 'src/database';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-password.dto';
import { UserEntity } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { ERROR_MESSAGE } from 'src/common/constants/error-message';

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
      throw new NotFoundException(ERROR_MESSAGE.ENTITY_NOT_FOUND('User', id));
    }

    return new UserEntity(this.users.get(id));
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.users.get(id);

    if (!user) {
      throw new NotFoundException(ERROR_MESSAGE.ENTITY_NOT_FOUND('User', id));
    }

    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException(ERROR_MESSAGE.INCORRECT_OLD_PASSWORD);
    }

    user.password = updateUserDto.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();

    return new UserEntity(user);
  }

  remove(id: string) {
    if (!this.users.has(id)) {
      throw new NotFoundException(ERROR_MESSAGE.ENTITY_NOT_FOUND('User', id));
    }

    this.users.delete(id);
  }
}
