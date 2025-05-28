import { Album } from './album.interface';
import { Artist } from './artist.interface';
import { Track } from './track.interface';

export interface Favorites {
  artists: Artist['id'][]; // favorite artists ids
  albums: Album['id'][]; // favorite albums ids
  tracks: Track['id'][]; // favorite tracks ids
}
