import { Injectable } from '@nestjs/common';
import { DataBase } from 'src/database/in-memory-db/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-password.dto';
import { UserEntity } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { CODE_STATUS } from 'src/common/constants/http-errors';
import { isLoginUnique } from './validators';

@Injectable()
export class UsersService {
  private readonly users: Map<string, UserEntity>;
  constructor(private readonly db: DataBase) {
    this.users = db.users;
  }
  create(createUserDto: CreateUserDto) {
    // [SelfReview]: It's better create separate helper for this logic
    const id = uuidv4();
    const timestamp = Date.now();
    const { login } = createUserDto;
    const newUser: UserEntity = {
      id,
      login,
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

    // [SelfReview]: It's better throw an exception and catch it in the controller
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
