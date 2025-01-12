import { IsString, Length } from 'class-validator';
import { IsValidPassword } from '../validators';

export class CreateUserDto {
  @IsString()
  @Length(2, 20, { message: 'Login must be between 2 and 20 characters long' })
  login: string;

  @IsValidPassword()
  password: string;
}
