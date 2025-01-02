import { ArtistEntity } from 'src/modules/artist/entities/artist.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';

const users = new Map<string, UserEntity>();
const artists = new Map<string, ArtistEntity>();

export const db = {
  users,
  artists,
};
