import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SWAGGER_PATH } from './common/swagger/swagger.const';
import { AppSwaggerModule } from './common/swagger/swagger.module';
import {
  BadRequestException,
  ClassSerializerInterceptor,
  ValidationPipe,
} from '@nestjs/common';
import { logger } from './common/loggers';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);

  AppSwaggerModule.setup(app);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        console.error('Validation Errors:', errors);
        return new BadRequestException(errors);
      },
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.use(logger);

  await app.listen(PORT);

  console.log(
    `Swagger доступен по адресу: http://localhost:${PORT}/${SWAGGER_PATH}`,
  );
}

bootstrap();
