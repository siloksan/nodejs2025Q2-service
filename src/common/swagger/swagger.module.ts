import { Module } from '@nestjs/common';
import * as yaml from 'yamljs';
import { resolve } from 'node:path';
import { SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_PATH } from './swagger.const';

@Module({})
export class AppSwaggerModule {
  static setup(app) {
    const apiDocPath = resolve(process.cwd(), 'doc/api.yaml');
    console.log('apiDocPath: ', apiDocPath);
    const swaggerDocument = yaml.load(apiDocPath);

    SwaggerModule.setup(SWAGGER_PATH, app, swaggerDocument, {
      customSiteTitle: 'API Documentation',
    });
  }
}
