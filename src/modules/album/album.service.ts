import { Injectable } from '@nestjs/common';
import { AlbumDto } from './dto/album.dto';
import { AlbumEntity } from './entities/album.entity';
import { v4 as uuidv4 } from 'uuid';
import { db } from 'src/database';
import { CODE_STATUS } from 'src/common/constants';

@Injectable()
export class AlbumService {
  private readonly albums = db.albums;

  create(albumDto: AlbumDto) {
    const id = uuidv4();
    const newAlbum: AlbumEntity = {
      id,
      name: albumDto.name,
      artistId: albumDto.artistId || null,
      year: albumDto.year,
    };

    this.albums.set(id, newAlbum);

    return new AlbumEntity(newAlbum);
  }

  findAll() {
    return Array.from(this.albums.values()).map(
      (album) => new AlbumEntity(album),
    );
  }

  findOne(id: string) {
    const album = this.albums.get(id);

    if (!album) {
      return { status: CODE_STATUS.NOT_FOUND };
    }

    return new AlbumEntity(album);
  }

  update(id: string, albumDto: AlbumDto) {
    const album = this.albums.get(id);

    if (!album) {
      return { status: CODE_STATUS.NOT_FOUND };
    }

    album.name = albumDto.name;
    album.artistId = albumDto.artistId || null;
    album.year = albumDto.year;

    return new AlbumEntity(album);
  }

  remove(id: string) {
    if (!this.albums.has(id)) {
      return { status: CODE_STATUS.NOT_FOUND };
    }

    this.albums.delete(id);
  }
}
