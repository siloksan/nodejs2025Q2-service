import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpException,
  HttpCode,
} from '@nestjs/common';
import { CODE_STATUS, ERROR_MESSAGE } from 'src/common/constants';
import { ENTITIES_NAME } from 'src/common/constants/entities-name';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.favoritesService.addToFavorite(
      ENTITIES_NAME.TRACKS,
      id,
    );

    if (typeof result === 'string') {
      return result;
    }

    throw new HttpException(
      ERROR_MESSAGE[result.status]('Track', id),
      result.status,
    );
  }

  @Post('album/:id')
  addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.favoritesService.addToFavorite(
      ENTITIES_NAME.ALBUMS,
      id,
    );

    if (typeof result === 'string') {
      return result;
    }

    throw new HttpException(
      ERROR_MESSAGE[result.status]('Album', id),
      result.status,
    );
  }

  @Post('artist/:id')
  addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.favoritesService.addToFavorite(
      ENTITIES_NAME.ARTISTS,
      id,
    );

    if (typeof result === 'string') {
      return result;
    }

    throw new HttpException(
      ERROR_MESSAGE[result.status]('Artist', id),
      result.status,
    );
  }

  @Delete('track/:id')
  @HttpCode(CODE_STATUS.NO_CONTENT)
  removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.favoritesService.remove(ENTITIES_NAME.TRACKS, id);

    if (typeof result === 'string') {
      return result;
    }

    throw new HttpException(
      ERROR_MESSAGE[result.status]('Artist', id),
      result.status,
    );
  }

  @Delete('album/:id')
  @HttpCode(CODE_STATUS.NO_CONTENT)
  removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.favoritesService.remove(ENTITIES_NAME.ALBUMS, id);

    if (typeof result === 'string') {
      return result;
    }

    throw new HttpException(
      ERROR_MESSAGE[result.status]('Album', id),
      result.status,
    );
  }

  @Delete('artist/:id')
  @HttpCode(CODE_STATUS.NO_CONTENT)
  removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.favoritesService.remove(ENTITIES_NAME.ARTISTS, id);

    if (typeof result === 'string') {
      return result;
    }

    throw new HttpException(
      ERROR_MESSAGE[result.status]('Artist', id),
      result.status,
    );
  }
}
