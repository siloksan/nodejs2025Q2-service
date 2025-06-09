import { PASSWORD_LENGTH } from './password-length';

export const VALIDATE_MESSAGE = {
  INVALID_UUD4: 'The id must be a valid UUID v4',
  PASSWORD_LENGTH: `Password must be between ${PASSWORD_LENGTH.min} and ${PASSWORD_LENGTH.max} characters long`,
} as const;
