export const PRISMA_ERRORS = {
  UNIQUE_CONST_FAIL: 'P2002',
  NOT_FOUND_RECORD: 'P2025',
} as const;

export type PrismaErrorCodes =
  (typeof PRISMA_ERRORS)[keyof typeof PRISMA_ERRORS];
