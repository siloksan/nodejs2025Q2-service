import { JwtService } from '@nestjs/jwt';
import { JwtServicesData } from 'src/common/constants';

export function jwtServiceFactory(jwtServicesData: JwtServicesData) {
  return Object.values(jwtServicesData).map((jwtServiceData) => ({
    provide: jwtServiceData.serviceName,
    useFactory: () => {
      return new JwtService({
        secret: jwtServiceData.secret,
        signOptions: {
          expiresIn: jwtServiceData.expireTime,
        },
      });
    },
    inject: [JwtService],
  }));
}
