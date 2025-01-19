import { createWriteStream, promises as fs } from 'node:fs';
import { join } from 'node:path';
import { LoggerValue } from './logger.const';

export async function createFolder(path: string, dirName: string) {
  const levelDir = join(path, dirName);

  try {
    await fs.mkdir(levelDir, { recursive: true });
  } catch (error) {
    console.error(`Error creating directory with path: ${levelDir}: `, error);
  }
}

export async function getLogFilePath(
  logFilesMap: Map<LoggerValue, string>,
  level: LoggerValue,
  maxFileSize: number,
  loggingDirectory: string,
) {
  const logFilePath = logFilesMap.get(level);
  const amountBytesInKB = 1024;

  if (logFilePath) {
    try {
      const stats = await fs.stat(logFilePath);
      if (stats.size < maxFileSize * amountBytesInKB) {
        return logFilePath;
      }
    } catch {}
  }

  const newFile = join(loggingDirectory, level, `${Date.now()}.log`);
  logFilesMap.set(level, newFile);
  return newFile;
}

export function writeToFile(message: string, path: string) {
  const writeStream = createWriteStream(path, { flags: 'a' });

  writeStream.on('error', (error) => {
    console.error('Error creating file.', error);
  });

  writeStream.write(`${message}\n`, 'utf8', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    }
  });

  writeStream.end();
}
