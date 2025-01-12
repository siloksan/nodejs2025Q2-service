import { UserEntity } from '../entities/user.entity';

export function isLoginUnique(login: string, users: Map<string, UserEntity>) {
  const usersArray = Array.from(users.values());

  if (usersArray.some((user) => user.login === login)) {
    return false;
  }

  return true;
}
