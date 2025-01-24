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

    return levelIndex <= currentLevelIndex;
  }

  private async logToFile(level: LoggerValue, message: string) {
    const filePath = join(this.logsDir, level, `${level}.log`);

    createFolder(this.logsDir, level);

    if (!checkFileExist(filePath)) createFile(filePath);

    rotateLogFile(level, filePath, this.maxSizeLogFile);

    writeToFile(message, filePath);
  }

  private editMessage(
    level: LoggerValue,
    message: string,
    ...optionalParams: any[]
  ) {
    return `[${level.toLocaleUpperCase()}]: [${new Date().toISOString()}] ${message} ${optionalParams}`;
  }

  private logMessage(
    level: LoggerValue,
    message: string,
    consoleLogger: (msg: string) => void,
    ...optionalParams: any[]
  ) {
    if (this.shouldLog(level)) {
      const convertedMessage = this.editMessage(level, message, optionalParams);
      consoleLogger(convertedMessage);
      this.logToFile(level, convertedMessage);
    }
  }

  public log(message: string, ...optionalParams: any[]) {
    this.logMessage(
      LOGGER_LEVELS.LOG,
      message,
      console.log.bind(console),
      optionalParams,
    );
  }

  public fatal(message: string, ...optionalParams: any[]) {
    this.logMessage(
      LOGGER_LEVELS.FATAL,
      message,
      console.error.bind(console),
      optionalParams,
    );
  }

  error(message: string, ...optionalParams: any[]) {
    this.logMessage(
      LOGGER_LEVELS.ERROR,
      message,
      console.error.bind(console),
      optionalParams,
    );
  }

  warn(message: string, ...optionalParams: any[]) {
    this.logMessage(
      LOGGER_LEVELS.WARN,
      message,
      console.warn.bind(console),
      optionalParams,
    );
  }

  debug(message: string, ...optionalParams: any[]) {
    this.logMessage(
      LOGGER_LEVELS.DEBUG,
      message,
      console.debug.bind(console),
      optionalParams,
    );
  }

  verbose(message: string, ...optionalParams: any[]) {
    this.logMessage(
      LOGGER_LEVELS.DEBUG,
      message,
      console.log.bind(console),
      optionalParams,
    );
  }
}
