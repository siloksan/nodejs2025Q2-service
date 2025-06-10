import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SWAGGER_PATH } from './common/swagger/swagger.const';
import { AppSwaggerModule } from './common/swagger/swagger.module';
import {
  BadRequestException,
  ClassSerializerInterceptor,
  ValidationPipe,
} from '@nestjs/common';
import { CustomLogger } from './common/loggers/logger.service';
import {
  logUncaughtException,
  logUnhandledRejection,
} from './common/loggers/logger.helpers';
import { AuthGuard } from './modules/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const logger = app.get(CustomLogger);
  app.useLogger(logger);

  const reflector = app.get(Reflector);
  const jwtService = app.get(JwtService);

  app.useGlobalGuards(new AuthGuard(jwtService, reflector));

  AppSwaggerModule.setup(app);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        logger.error('Validation Errors:', errors);
        return new BadRequestException(errors);
      },
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(PORT);

  logger.log(
    `Swagger is available at: http://localhost:${PORT}/${SWAGGER_PATH}`,
  );

  logger.log(`Server is running at: http://localhost:${PORT}`);

  logUncaughtException(logger);
  logUnhandledRejection(logger);
}

bootstrap();
