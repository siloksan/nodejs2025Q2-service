import { Injectable } from '@nestjs/common';
import {
  EntitiesName,
  ENTITIES_NAME,
} from 'src/common/constants/entities-name';
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

@Injectable()
export class DataBase {
  public users = new Map<string, UserEntity>();
  public artists = new Map<string, ArtistEntity>();
  public tracks = new Map<string, TrackEntity>();
  public albums = new Map<string, AlbumEntity>();

  public favorites = {
    artists: new Set<string>(),
    tracks: new Set<string>(),
    albums: new Set<string>(),
  };

  public getAllFavorites() {
    const artists = Array.from(this.favorites.artists.values()).map(
      (artistId) => this.artists.get(artistId),
    );
    const tracks = Array.from(this.favorites.tracks.values()).map((trackId) =>
      this.tracks.get(trackId),
    );

    const albums = Array.from(this.favorites.albums.values()).map((albumId) =>
      this.albums.get(albumId),
    );

    return { artists, tracks, albums };
  }

  public addToFavorites(entityName: EntitiesName, id: string) {
    this.favorites[entityName].add(id);
  }

  public removeFromFavorites(entityName: EntitiesName, id: string) {
    this.favorites[entityName].delete(id);
  }

  public checkFavoriteExists(entityName: EntitiesName, id: string) {
    return this.favorites[entityName].has(id);
  }
  public checkEntityExists(entityName: EntitiesName, id: string) {
    return this[entityName].has(id);
  }

  public removeEntity(entityName: EntitiesName, id: string) {
    this[entityName].delete(id);

    if (this.favorites[entityName].has(id)) {
      this.favorites[entityName].delete(id);
    }

    if (entityName === ENTITIES_NAME.ALBUMS) {
      this.tracks.forEach((track) => {
        if (track.albumId === id) {
          track.albumId = null;
        }
      });
    }

    if (entityName === ENTITIES_NAME.ARTISTS) {
      this.tracks.forEach((track) => {
        if (track.artistId === id) {
          track.artistId = null;
        }
      });

      this.albums.forEach((album) => {
        if (album.artistId === id) {
          album.artistId = null;
        }
      });
    }
  }
}
