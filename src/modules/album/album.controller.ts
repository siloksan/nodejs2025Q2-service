import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpException,
  HttpCode,
  Put,
} from '@nestjs/common';
import { CODE_STATUS, ERROR_MESSAGE } from 'src/common/constants';
import { AlbumService } from './album.service';
import { AlbumDto } from './dto/album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Body() createAlbumDto: AlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.albumService.findOne(id);

    if ('status' in result) {
      throw new HttpException(
        ERROR_MESSAGE[result.status]('Album', id),
        result.status,
      );
    }

    return result;
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: AlbumDto,
  ) {
    const result = this.albumService.update(id, updateAlbumDto);

    if ('status' in result) {
      throw new HttpException(
        ERROR_MESSAGE[result.status]('Album', id),
        result.status,
      );
    }

    return result;
  }

  @Delete(':id')
  @HttpCode(CODE_STATUS.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.albumService.remove(id);

    if (!result) return;

    if ('status' in result) {
      throw new HttpException(
        ERROR_MESSAGE[result.status]('Album', id),
        result.status,
      );
    }
  }
}
