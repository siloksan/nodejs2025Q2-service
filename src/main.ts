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

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(CustomLogger));

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

  await app.listen(PORT);

  console.log(
    `Swagger is available at: http://localhost:${PORT}/${SWAGGER_PATH}`,
  );
  console.log(`Server is running at: http://localhost:${PORT}`);
}

bootstrap();
