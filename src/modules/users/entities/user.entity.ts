import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { USER_SEARCH_PROPERTIES } from 'src/common/constants/user-search-properties';
import { convertTimeStampToMs } from 'src/common/helpers/time-mappers';

export class UserEntity {
  [USER_SEARCH_PROPERTIES.ID]: string; // uuid v4
  [USER_SEARCH_PROPERTIES.LOGIN]: string;

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
