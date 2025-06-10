export const JWT_CONSTANTS = {
  accessJwt: {
    serviceName: 'ACCESS_JWT_SERVICE',
    secret: process.env.JWT_SECRET_KEY || 'secret',
    expireTime: process.env.TOKEN_EXPIRE_TIME || '1h',
  },
  refreshJwt: {
    serviceName: 'REFRESH_JWT_SERVICE',
    secret: process.env.JWT_SECRET_REFRESH_KEY || 'secret_refresh',
    expireTime: process.env.TOKEN_REFRESH_EXPIRE_TIME || '12h',
  },
} as const;

export type JwtServicesData = typeof JWT_CONSTANTS;
