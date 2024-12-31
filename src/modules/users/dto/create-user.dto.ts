import { IsString, Length } from 'class-validator';
import { IsLoginUnique } from '../validators/is-login-unique';
import { UserEntity } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  @Length(2, 20, { message: 'Login must be between 2 and 20 characters long' })
  @IsLoginUnique({ message: 'This login is already taken' })
  login: string;

  @IsString()
  @Length(8, 66, {
    message: 'Password must be between 8 and 66 characters long',
  })
  password: string;
}
