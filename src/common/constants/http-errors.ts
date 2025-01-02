export const CODE_STATUS = {
  NO_CONTENT: 204,

  NOT_FOUND: 404,
  FORBIDDEN: 403,
} as const;

export const ERROR_MESSAGE = {
  [CODE_STATUS.NOT_FOUND]: (entity: string, id: string) =>
    `${entity} with ID ${id} not found`,
  [CODE_STATUS.FORBIDDEN]: (data: string) => `Incorrect ${data}`,
} as const;
