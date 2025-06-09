import { PartialType } from '@nestjs/mapped-types';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { AlbumEntity } from 'src/modules/album/entities/album.entity';
import { ArtistEntity } from 'src/modules/artist/entities/artist.entity';

export class TrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsUUID()
  artistId: ArtistEntity['id']; // refers to Artist

  @IsOptional()
  @IsUUID()
  albumId: AlbumEntity['id']; // refers to Album

  @IsInt()
  duration: number; //integer number
}

export class UpdateAlbumDto extends PartialType(TrackDto) {}
