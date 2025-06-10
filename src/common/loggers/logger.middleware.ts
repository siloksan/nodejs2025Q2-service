import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { finished } from 'node:stream';
import { CustomLogger } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: CustomLogger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    finished(res, () => {
      const responseTime = Date.now() - start;

      this.logRequestMessage(req, responseTime);
      this.logResponseMessage(res);
    });

    next();
  }

  private logRequestMessage(req: Request, responseTime: number) {
    const { method, url, query, body, headers } = req;
    const headersMsg = `Headers: ${JSON.stringify(headers)}`;
    const queryMsg = `Query: ${JSON.stringify(query)}`;
    const bodyMsg = `Body: ${JSON.stringify(body)}`;
    const requestMsg = `[Request]: [method]:${method} [url]: ${url} [response-time]: ${responseTime} ms`;
    const debugMessage = `${requestMsg}\n${headersMsg}\n${queryMsg}\n${bodyMsg}`;

    this.logger.log(requestMsg);
    this.logger.debug(debugMessage);
  }

  private logResponseMessage(res: Response) {
    const { statusCode } = res;
    const contentLength = res.get('content-length');

    this.logger.log(
      `[Response]: [status]: ${statusCode} [content-length]: ${contentLength}`,
    );
  }
}
