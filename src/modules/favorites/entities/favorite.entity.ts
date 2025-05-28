import { AlbumEntity } from 'src/modules/album/entities/album.entity';
import { ArtistEntity } from 'src/modules/artist/entities/artist.entity';
import { TrackEntity } from 'src/modules/track/entities/track.entity';

export class FavoritesEntity {
  albums: AlbumEntity['id'][];
  tracks: TrackEntity['id'][];
  artists: ArtistEntity['id'][];
}
