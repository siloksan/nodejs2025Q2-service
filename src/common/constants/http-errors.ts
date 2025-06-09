export const CODE_STATUS = {
  NO_CONTENT: 204,

  NOT_FOUND: 404,
  FORBIDDEN: 403,
  NOT_EXIST: 422,
} as const;

export const ERROR_MESSAGE = {
  [CODE_STATUS.NOT_FOUND]: (entity: string, id: string) =>
    `${entity} with ID ${id} not found`,
  [CODE_STATUS.FORBIDDEN]: (data: string) => `Incorrect ${data}`,
  [CODE_STATUS.NOT_EXIST]: (entity: string, id: string) =>
    `${entity} with ID ${id} does not exist`,
} as const;
