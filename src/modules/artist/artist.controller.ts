import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  ParseUUIDPipe,
  Put,
  HttpCode,
} from '@nestjs/common';
import { CODE_STATUS, ERROR_MESSAGE } from 'src/common/constants';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.artistService.findOne(id);

    if ('status' in result) {
      throw new HttpException(
        ERROR_MESSAGE[result.status]('Artist', id),
        result.status,
      );
    }

    return result;
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const result = this.artistService.update(id, updateArtistDto);

    if ('status' in result) {
      throw new HttpException(
        ERROR_MESSAGE[result.status]('Artist', id),
        result.status,
      );
    }

    return result;
  }

  @Delete(':id')
  @HttpCode(CODE_STATUS.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.artistService.remove(id);

    if (!result) return;

    if ('status' in result) {
      throw new HttpException(
        ERROR_MESSAGE[result.status]('Artist', id),
        result.status,
      );
    }
  }
}
