import { IsString, Length } from 'class-validator';
import { USER_SEARCH_PROPERTIES } from 'src/common/constants/user-search-properties';
import { IsValidPassword } from '../validators';

export class CreateUserDto {
  @IsString()
  @Length(2, 20, { message: 'Login must be between 2 and 20 characters long' })
  [USER_SEARCH_PROPERTIES.LOGIN]: string;

  @IsValidPassword()
  password: string;
}
