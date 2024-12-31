import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SWAGGER_PATH } from './common/swagger/swagger.const';
import { AppSwaggerModule } from './common/swagger/swagger.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);

  AppSwaggerModule.setup(app);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(PORT);

  console.log(
    `Swagger доступен по адресу: http://localhost:${PORT}/${SWAGGER_PATH}`,
  );
}
bootstrap();
