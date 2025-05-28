import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  HttpException,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-password.dto';
import { ERROR_MESSAGE, CODE_STATUS } from 'src/common/constants';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.usersService.findOne(id);

    if ('status' in result) {
      throw new HttpException(
        ERROR_MESSAGE[result.status]('User', id),
        result.status,
      );
    }

    return result;
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const result = this.usersService.update(id, updateUserDto);

    if ('status' in result) {
      if (result.status === CODE_STATUS.NOT_FOUND) {
        throw new HttpException(
          ERROR_MESSAGE[result.status]('User', id),
          result.status,
        );
      } else if (result.status === CODE_STATUS.FORBIDDEN) {
        throw new HttpException(
          ERROR_MESSAGE[result.status]('old password'),
          result.status,
        );
      }
    }

    return result;
  }

  @Delete(':id')
  @HttpCode(CODE_STATUS.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.usersService.remove(id);

    if (!result) return;

    if ('status' in result) {
      throw new HttpException(
        ERROR_MESSAGE[result.status]('User', id),
        result.status,
      );
    }
  }
}
