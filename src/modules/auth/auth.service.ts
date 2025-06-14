import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_CONSTANTS } from 'src/common/constants';
import { USER_SEARCH_PROPERTIES } from 'src/common/constants/user-search-properties';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { RefreshDto } from './dto/auth.dto';
import { AuthPayload } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    @Inject(JWT_CONSTANTS.accessJwt.serviceName)
    private readonly accessJwtService: JwtService,
    @Inject(JWT_CONSTANTS.refreshJwt.serviceName)
    private readonly refreshJwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    try {
      const { id } = await this.usersService.create(createUserDto);

      return { id, message: 'User successfully signup' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async login(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;

    const user = await this.usersService.findOne(
      USER_SEARCH_PROPERTIES.LOGIN,
      login,
    );

    try {
      await this.usersService.verifyPassword(password, user.password);
      const payload: AuthPayload = { userId: user.id, login: user.login };

      return {
        accessToken: await this.accessJwtService.signAsync(payload),
        refreshToken: await this.refreshJwtService.signAsync(payload),
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }

  async refresh(refreshDto: RefreshDto) {
    const { refreshToken } = refreshDto;

    if (!refreshToken) {
      throw new UnauthorizedException('No refreshToken in body');
    }

    try {
      const { userId, login } = await this.refreshJwtService.verifyAsync(
        refreshToken,
        {
          secret: JWT_CONSTANTS.refreshJwt.secret,
        },
      );

      const payload: AuthPayload = { userId, login };

      return {
        accessToken: await this.accessJwtService.signAsync(payload),
        refreshToken: await this.refreshJwtService.signAsync(payload),
      };
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }
  }
}
