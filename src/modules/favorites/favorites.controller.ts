import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { CODE_STATUS } from 'src/common/constants';
import { ENTITIES_NAME } from 'src/common/constants/entities-name';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async findAll() {
    return await this.favoritesService.findAll();
  }

  @Post('track/:id')
  async addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.addToFavorite(ENTITIES_NAME.TRACKS, id);
  }

  @Post('album/:id')
  async addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.addToFavorite(ENTITIES_NAME.ALBUMS, id);
  }

  @Post('artist/:id')
  async addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.addToFavorite(ENTITIES_NAME.ARTISTS, id);
  }
  @Delete('track/:id')
  @HttpCode(CODE_STATUS.NO_CONTENT)
  async removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.remove(ENTITIES_NAME.TRACKS, id);
  }

  @Delete('album/:id')
  @HttpCode(CODE_STATUS.NO_CONTENT)
  async removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.remove(ENTITIES_NAME.ALBUMS, id);
  }

  @Delete('artist/:id')
  @HttpCode(CODE_STATUS.NO_CONTENT)
  async removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.remove(ENTITIES_NAME.ARTISTS, id);
  }
}
