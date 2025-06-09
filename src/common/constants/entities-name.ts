export const ENTITIES_NAME = {
  ARTISTS: 'artists',
  ALBUMS: 'albums',
  TRACKS: 'tracks',
} as const;

export type EntitiesName = (typeof ENTITIES_NAME)[keyof typeof ENTITIES_NAME];
