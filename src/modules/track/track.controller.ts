import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpException,
  Put,
  HttpCode,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackDto } from './dto/track.dto';
import { CODE_STATUS, ERROR_MESSAGE } from 'src/common/constants';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(@Body() trackDto: TrackDto) {
    return this.trackService.create(trackDto);
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.trackService.findOne(id);

    if ('status' in result) {
      throw new HttpException(
        ERROR_MESSAGE[result.status]('Track', id),
        result.status,
      );
    }

    return result;
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() trackDto: TrackDto,
  ) {
    const result = this.trackService.update(id, trackDto);

    if ('status' in result) {
      throw new HttpException(
        ERROR_MESSAGE[result.status]('Track', id),
        result.status,
      );
    }

    return result;
  }

  @Delete(':id')
  @HttpCode(CODE_STATUS.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.trackService.remove(id);

    if (!result) return;

    if ('status' in result) {
      throw new HttpException(
        ERROR_MESSAGE[result.status]('Track', id),
        result.status,
      );
    }
  }
}
