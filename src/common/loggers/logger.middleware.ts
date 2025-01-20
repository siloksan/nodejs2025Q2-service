import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { finished } from 'node:stream';
import { CustomLogger } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: CustomLogger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, url } = req;
    const start = Date.now();

    finished(res, () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');
      const responseTime = Date.now() - start;

      this.logger.log(
        `[method]:${method} [url]: ${url} [status]: ${statusCode} [content-length]: ${contentLength} [response-time]: ${responseTime} ms`,
      );
      this.logger.debug(`Headers: ${JSON.stringify(req.headers)}`);
      this.logger.debug(`Query: ${JSON.stringify(req.query)}`);
      this.logger.debug(`Body: ${JSON.stringify(req.body)}`);
    });

    next();
  }
}
