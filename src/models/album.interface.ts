import { Artist } from './artist.interface';

export interface Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: Artist['id'] | null; // refers to Artist
}
