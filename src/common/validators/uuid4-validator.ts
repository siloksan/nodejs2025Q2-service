import { IsUUID } from 'class-validator';
import { VALIDATE_MESSAGE } from '../constants';

export class IdValidator {
  @IsUUID('4', { message: VALIDATE_MESSAGE.INVALID_UUD4 })
  id: string;
}
