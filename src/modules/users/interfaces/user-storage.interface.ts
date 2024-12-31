import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-password.dto';
import { UserEntity } from '../entities/user.entity';

export interface IUserStorage {
  findAll(): UserEntity[];
  create(params: CreateUserDto): UserEntity;
  findOne(id: string): UserEntity | undefined;
  updatePassword(id: string, params: UpdateUserDto): UserEntity | undefined;
  remove(id: string);
}
