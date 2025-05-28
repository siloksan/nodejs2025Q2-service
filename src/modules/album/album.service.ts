import { Injectable } from '@nestjs/common';
import { AlbumDto } from './dto/album.dto';
import { AlbumEntity } from './entities/album.entity';
import { v4 as uuidv4 } from 'uuid';
import { DataBase } from 'src/database/database.service';
import { CODE_STATUS } from 'src/common/constants';
import { ENTITIES_NAME } from 'src/common/constants/entities-name';

@Injectable()
export class AlbumService {
  // private readonly albums: Map<string, AlbumEntity>;
  constructor(private readonly db: DataBase) {
    // this.albums = db.albums;
  }

  create(albumDto: AlbumDto) {
    const id = uuidv4();
    const newAlbum: AlbumEntity = {
      id,
      name: albumDto.name,
      artistId: albumDto.artistId || null,
      year: albumDto.year,
    };

    this.db.albums.set(id, newAlbum);

    return new AlbumEntity(newAlbum);
  }

  findAll() {
    return Array.from(this.db.albums.values()).map(
      (album) => new AlbumEntity(album),
    );
  }

  findOne(id: string) {
    const album = this.db.albums.get(id);

    if (!album) {
      return { status: CODE_STATUS.NOT_FOUND };
    }

    return new AlbumEntity(album);
  }

  update(id: string, albumDto: AlbumDto) {
    const album = this.db.albums.get(id);

    if (!album) {
      return { status: CODE_STATUS.NOT_FOUND };
    }

    album.name = albumDto.name;
    album.artistId = albumDto.artistId || null;
    album.year = albumDto.year;

    return new AlbumEntity(album);
  }

  remove(id: string) {
    if (!this.db.checkEntityExists(ENTITIES_NAME.ALBUMS, id)) {
      return { status: CODE_STATUS.NOT_FOUND };
    }

    this.db.removeEntity(ENTITIES_NAME.ALBUMS, id);
  }
}
