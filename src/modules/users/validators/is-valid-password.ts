import { applyDecorators } from '@nestjs/common';
import { IsString, Length } from 'class-validator';
import { PASSWORD_LENGTH, VALIDATE_MESSAGE } from 'src/common/constants';

export function IsValidPassword() {
  return applyDecorators(
    IsString(),
    Length(PASSWORD_LENGTH.min, PASSWORD_LENGTH.max, {
      message: VALIDATE_MESSAGE.PASSWORD_LENGTH,
    }),
  );
}
