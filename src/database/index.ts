import { UserEntity } from 'src/modules/users/entities/user.entity';

const users = new Map<string, UserEntity>();

export const db = {
  users,
};
