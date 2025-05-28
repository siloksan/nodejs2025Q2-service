import { IsString, Length } from 'class-validator';
import { IsLoginUnique, IsValidPassword } from '../validators';

export class CreateUserDto {
  @IsString()
  @Length(2, 20, { message: 'Login must be between 2 and 20 characters long' })
  @IsLoginUnique({ message: 'This login is already taken' })
  login: string;

  @IsValidPassword()
  password: string;
}
