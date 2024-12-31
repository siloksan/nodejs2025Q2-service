import { Injectable } from '@nestjs/common';
import { db } from 'src/database';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-password.dto';
import { UserEntity } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

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
    return Array.from(this.users.values());
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
