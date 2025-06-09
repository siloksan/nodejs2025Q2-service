import { IsValidPassword } from '../validators';

export class UpdateUserDto {
  @IsValidPassword()
  oldPassword: string; // previous password

  @IsValidPassword()
  newPassword: string; // new password
}
