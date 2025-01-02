import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { v4 as uuidv4 } from 'uuid';
import { db } from 'src/database';
import { CODE_STATUS } from 'src/common/constants';

@Injectable()
export class ArtistService {
  private readonly artists = db.artists;
  create(createArtistDto: CreateArtistDto) {
    const id = uuidv4();
    const newArtist: ArtistEntity = {
      id,
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };

    this.artists.set(id, newArtist);

    return new ArtistEntity(newArtist);
  }

  findAll() {
    return Array.from(this.artists.values()).map(
      (artist) => new ArtistEntity(artist),
    );
  }

  findOne(id: string) {
    const artist = this.artists.get(id);

    if (!artist) {
      return { status: CODE_STATUS.NOT_FOUND };
    }

    return new ArtistEntity(artist);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.artists.get(id);

    if (!artist) {
      return { status: CODE_STATUS.NOT_FOUND };
    }

    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;

    return new ArtistEntity(artist);
  }

  remove(id: string) {
    if (!this.artists.has(id)) {
      return { status: CODE_STATUS.NOT_FOUND };
    }

    this.artists.delete(id);
  }
}
