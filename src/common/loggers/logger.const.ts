export const LOGGER_LEVELS = {
  FATAL: 'fatal',
  ERROR: 'error',
  WARN: 'warn',
  LOG: 'log',
  DEBUG: 'debug',
  VERBOSE: 'verbose',
} as const;

export type LoggerValue = (typeof LOGGER_LEVELS)[keyof typeof LOGGER_LEVELS];
