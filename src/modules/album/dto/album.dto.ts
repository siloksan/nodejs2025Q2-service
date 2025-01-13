import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ArtistEntity } from 'src/modules/artist/entities/artist.entity';

export class AlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  year: number;

  @IsOptional()
  @IsString()
  artistId: ArtistEntity['id']; // refers to Artist
}

export class UpdateAlbumDto extends PartialType(AlbumDto) {}
