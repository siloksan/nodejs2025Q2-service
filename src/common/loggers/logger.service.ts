import { Injectable } from '@nestjs/common';
import { LoggerValue, LOGGER_LEVELS } from './logger.const';
import { resolve } from 'node:path';
import { createFolder, getLogFilePath, writeToFile } from './logger.helpers';
import { LoggerService } from '@nestjs/common/services';

@Injectable()
export class CustomLogger implements LoggerService {
  private readonly levels = Object.values(LOGGER_LEVELS);
  private readonly currentLevel = (process.env.LOG_LEVEL ||
    LOGGER_LEVELS.LOG) as LoggerValue;
  private readonly lastLogFiles: Map<LoggerValue, string> = new Map();
  private readonly maxSizeLogFile = Number(process.env.LOG_LEVEL) || 1000;
  private readonly logsDir = resolve(process.cwd(), 'logs');

  private shouldLog(level: LoggerValue) {
    const currentLevelIndex = this.levels.indexOf(this.currentLevel);
    const levelIndex = this.levels.indexOf(level);

    return levelIndex >= currentLevelIndex;
  }

  private async logToFile(level: LoggerValue, message: string) {
    await createFolder(this.logsDir, level);

    const logFilePath = await getLogFilePath(
      this.lastLogFiles,
      level,
      this.maxSizeLogFile,
      this.logsDir,
    );

    writeToFile(message, logFilePath);
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
    this.logMessage(message, LOGGER_LEVELS.LOG, console.log);
  }

  public fatal(message: string) {
    this.logMessage(message, LOGGER_LEVELS.FATAL, console.error);
  }

  error(message: string, trace: string) {
    const errorMessage = `${message}\n${trace}`;
    this.logMessage(errorMessage, LOGGER_LEVELS.ERROR, console.error);
  }

  warn(message: string) {
    this.logMessage(message, LOGGER_LEVELS.WARN, console.warn);
  }

  debug(message: string) {
    this.logMessage(message, LOGGER_LEVELS.DEBUG, console.debug);
  }

  verbose(message: string) {
    this.logMessage(message, LOGGER_LEVELS.DEBUG, console.log);
  }
}
