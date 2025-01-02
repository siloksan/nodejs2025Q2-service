import { ArtistEntity } from 'src/modules/artist/entities/artist.entity';

export class AlbumEntity {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: ArtistEntity['id'] | null; // refers to Artist

  constructor(partial: Partial<AlbumEntity>) {
    Object.assign(this, partial);
  }
}
