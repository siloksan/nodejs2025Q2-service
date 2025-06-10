import { LoggerService } from '@nestjs/common';
import {
  mkdirSync,
  renameSync,
  statSync,
  appendFileSync,
  existsSync,
  writeFileSync,
} from 'node:fs';
import { join } from 'node:path';

export function createFolder(path: string, dirName: string) {
  const levelDir = join(path, dirName);

  mkdirSync(levelDir, { recursive: true });
}

export function checkFileExist(filePath: string) {
  return existsSync(filePath);
}

export function createFile(filePath: string) {
  writeFileSync(filePath, '', 'utf8');
}

export function writeToFile(message: string, path: string) {
  appendFileSync(path, `${message}\n`, 'utf8');
}

function checkFileSize(filePath: string, maxFileSize: number) {
  const amountBytesInKB = 1024;
  const stats = statSync(filePath);

  return stats.size < maxFileSize * amountBytesInKB;
}

export async function rotateLogFile(
  level: string,
  filePath: string,
  maxFileSize: number,
) {
  if (checkFileSize(filePath, maxFileSize)) {
    return;
  }

  const newName = `${Date.now()}-${level}.log`;

  renameSync(filePath, newName);
}

export function logUncaughtException(logger: LoggerService) {
  process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception', error.message);
  });
}

export function logUnhandledRejection(logger: LoggerService) {
  process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled Rejection', reason);
  });
}
