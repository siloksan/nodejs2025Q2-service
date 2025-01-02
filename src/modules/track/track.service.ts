import { Injectable } from '@nestjs/common';
import { TrackDto } from './dto/track.dto';
import { TrackEntity } from './entities/track.entity';
import { v4 as uuidv4 } from 'uuid';
import { DataBase } from 'src/database/database.service';
import { CODE_STATUS } from 'src/common/constants';
import { ENTITIES_NAME } from 'src/common/constants/entities-name';

@Injectable()
export class TrackService {
  private readonly tracks: Map<string, TrackEntity>;
  constructor(private readonly db: DataBase) {
    this.tracks = db.tracks;
  }

  create(trackDto: TrackDto) {
    const id = uuidv4();
    const newTrack: TrackEntity = {
      id,
      name: trackDto.name,
      albumId: trackDto.albumId || null,
      artistId: trackDto.artistId || null,
      duration: trackDto.duration,
    };

    this.tracks.set(id, newTrack);

    return new TrackEntity(newTrack);
  }

  findAll() {
    return Array.from(this.tracks.values()).map(
      (track) => new TrackEntity(track),
    );
  }

  findOne(id: string) {
    const track = this.tracks.get(id);

    if (!track) {
      return { status: CODE_STATUS.NOT_FOUND };
    }

    return new TrackEntity(track);
  }

  update(id: string, trackDto: TrackDto) {
    const track = this.tracks.get(id);

    if (!track) {
      return { status: CODE_STATUS.NOT_FOUND };
    }

    track.name = trackDto.name;
    track.albumId = trackDto.albumId || null;
    track.artistId = trackDto.artistId || null;
    track.duration = trackDto.duration;

    return new TrackEntity(track);
  }

  remove(id: string) {
    if (!this.db.checkEntityExists(ENTITIES_NAME.TRACKS, id)) {
      return { status: CODE_STATUS.NOT_FOUND };
    }

    this.db.removeEntity(ENTITIES_NAME.TRACKS, id);
  }
}
