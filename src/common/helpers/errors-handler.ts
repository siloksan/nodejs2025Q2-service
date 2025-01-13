import { HttpException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaErrorCodes } from '../constants/prisma-status-code';

interface ErrorOptions<T> {
  error: unknown;
  code: T;
  exception: HttpException;
}

export function handleKnownRequestError<T extends PrismaErrorCodes>({
  error,
  code,
  exception,
}: ErrorOptions<T>) {
  if (error instanceof PrismaClientKnownRequestError && error.code === code) {
    throw exception;
  }

  throw error;
}
