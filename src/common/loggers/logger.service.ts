import { Injectable } from '@nestjs/common';
import { LoggerValue, LOGGER_LEVELS } from './logger.const';
import { join, resolve } from 'node:path';
import {
  checkFileExist,
  createFile,
  createFolder,
  rotateLogFile,
  writeToFile,
} from './logger.helpers';
import { ConsoleLogger } from '@nestjs/common/services';

@Injectable()
export class CustomLogger extends ConsoleLogger {
  private readonly levels = Object.values(LOGGER_LEVELS);
  private readonly currentLevel = (process.env.LOG_LEVEL ||
    LOGGER_LEVELS.LOG) as LoggerValue;
  private readonly maxSizeLogFile = Number(process.env.LOG_LEVEL) || 1000;
  private readonly logsDir = resolve(process.cwd(), 'logs');

  private shouldLog(level: LoggerValue) {
    const currentLevelIndex = this.levels.indexOf(this.currentLevel);
    const levelIndex = this.levels.indexOf(level);

    return levelIndex >= currentLevelIndex;
  }

  private async logToFile(level: LoggerValue, message: string) {
    const filePath = join(this.logsDir, `${level}.log`);

    createFolder(this.logsDir, level);

    if (!checkFileExist(filePath)) createFile(filePath);

    rotateLogFile(level, filePath, this.maxSizeLogFile);

    writeToFile(message, filePath);
  }

  private editMessage(message: string, level: LoggerValue) {
    return `[${level.toLocaleUpperCase()}]: [${new Date().toISOString()}] ${message}`;
  }

  private logMessage(
    message: string,
    level: LoggerValue,
    consoleLogger: (msg: string) => void,
  ) {
    if (this.shouldLog(level)) {
      const convertedMessage = this.editMessage(message, level);
      consoleLogger(convertedMessage);
      this.logToFile(level, convertedMessage);
    }
  }

  public log(message: string) {
    this.logMessage(message, LOGGER_LEVELS.LOG, console.log.bind(console));
  }

  public fatal(message: string) {
    this.logMessage(message, LOGGER_LEVELS.FATAL, console.error.bind(console));
  }

  error(message: string, trace: string) {
    const errorMessage = `${message}\n${trace}`;
    this.logMessage(
      errorMessage,
      LOGGER_LEVELS.ERROR,
      console.error.bind(console),
    );
  }

  warn(message: string) {
    this.logMessage(message, LOGGER_LEVELS.WARN, console.warn.bind(console));
  }

  debug(message: string) {
    this.logMessage(message, LOGGER_LEVELS.DEBUG, console.debug.bind(console));
  }

  verbose(message: string) {
    this.logMessage(message, LOGGER_LEVELS.DEBUG, console.log.bind(console));
  }
}
