import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANTS } from 'src/common/constants';
import { jwtServiceFactory } from './utils/jwt-service.factory';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, ...jwtServiceFactory(JWT_CONSTANTS)],
  exports: [
    ...Object.values(JWT_CONSTANTS).map(
      (jwtServiceData) => jwtServiceData.serviceName,
    ),
  ],
})
export class AuthModule {}
