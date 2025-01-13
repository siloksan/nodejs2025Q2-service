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
  async create(@Body() trackDto: TrackDto) {
    return await this.trackService.create(trackDto);
  }

  @Get()
  async findAll() {
    return await this.trackService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.trackService.findOne(id);

    // if ('status' in result) {
    //   throw new HttpException(
    //     ERROR_MESSAGE[result.status]('Track', id),
    //     result.status,
    //   );
    // }

    // return result;
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() trackDto: TrackDto,
  ) {
    return await this.trackService.update(id, trackDto);

    // if ('status' in result) {
    //   throw new HttpException(
    //     ERROR_MESSAGE[result.status]('Track', id),
    //     result.status,
    //   );
    // }

    // return result;
  }

  @Delete(':id')
  @HttpCode(CODE_STATUS.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.trackService.remove(id);

    // if (!result) return;

    // if ('status' in result) {
    //   throw new HttpException(
    //     ERROR_MESSAGE[result.status]('Track', id),
    //     result.status,
    //   );
    // }
  }
}
