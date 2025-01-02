import { AlbumEntity } from 'src/modules/album/entities/album.entity';
import { ArtistEntity } from 'src/modules/artist/entities/artist.entity';
import { TrackEntity } from 'src/modules/track/entities/track.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';

const users = new Map<string, UserEntity>();
const artists = new Map<string, ArtistEntity>();
const tracks = new Map<string, TrackEntity>();
const albums = new Map<string, AlbumEntity>();

export const db = {
  users,
  artists,
  tracks,
  albums,
};
