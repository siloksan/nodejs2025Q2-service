import { AlbumEntity } from 'src/modules/album/entities/album.entity';
import { ArtistEntity } from 'src/modules/artist/entities/artist.entity';

export class TrackEntity {
  id: string; // uuid v4
  name: string;
  artistId: ArtistEntity['id'] | null; // refers to Artist
  albumId: AlbumEntity['id'] | null; // refers to Album
  duration: number; //integer number

  constructor(partial: Partial<TrackEntity>) {
    Object.assign(this, partial);
  }
}
