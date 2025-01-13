import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { convertTimeStampToMs } from 'src/common/helpers/time-mappers';

export class UserEntity {
  id: string; // uuid v4
  login: string;

  @Exclude()
  password: string;

  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);

    if (partial.createdAt) {
      this.createdAt = convertTimeStampToMs(partial.createdAt);
    }

    if (partial.updatedAt) {
      this.updatedAt = convertTimeStampToMs(partial.updatedAt);
    }
  }
}
