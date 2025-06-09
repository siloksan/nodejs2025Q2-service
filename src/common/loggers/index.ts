import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(
    `Request: ${Date.now()}, Method: ${req.method}, Endpoint: ${req.url}`,
  );

  next();
}
