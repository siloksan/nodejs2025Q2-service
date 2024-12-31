import { Album } from './album.interface';
import { Artist } from './artist.interface';

export interface Track {
  id: string; // uuid v4
  name: string;
  artistId: Artist['id'] | null; // refers to Artist
  albumId: Album['id'] | null; // refers to Album
  duration: number; // integer number
}
