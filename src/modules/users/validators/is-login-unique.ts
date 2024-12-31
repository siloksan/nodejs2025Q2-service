import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { db } from 'src/database';

@ValidatorConstraint({ async: true })
@Injectable()
class IsLoginUniqueConstraint implements ValidatorConstraintInterface {
  validate(login: string) {
    const { users } = db;
    const usersArray = Array.from(users.values());

    if (usersArray.some((user) => user.login === login)) {
      return false;
    }

    return true;
  }
}

export function IsLoginUnique(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsLoginUniqueConstraint,
    });
  };
}
