import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { v4 as uuidv4 } from 'uuid';
import { DataBase } from 'src/database/in-memory-db/database.service';
import { CODE_STATUS, ERROR_MESSAGE } from 'src/common/constants';
import { ENTITIES_NAME } from 'src/common/constants/entities-name';
import { PrismaService } from 'src/database/prisma-module/prisma.service';

@Injectable()
export class ArtistService {
  private readonly artists: Map<string, ArtistEntity>;
  constructor(
    private readonly db: DataBase,
    private readonly prisma: PrismaService,
  ) {
    this.artists = db.artists;
  }

  async create(createArtistDto: CreateArtistDto) {
    const newArtist = await this.prisma.artist.create({
      data: createArtistDto,
    });

    return new ArtistEntity(newArtist);
  }

  async findAll() {
    return await this.prisma.artist.findMany();
  }

  async findOne(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });

    if (!artist) {
      throw new HttpException(
        ERROR_MESSAGE[HttpStatus.NOT_FOUND]('Artist', id),
        HttpStatus.NOT_FOUND,
      );
    }

    return new ArtistEntity(artist);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    try {
      const updatedArtist = await this.prisma.artist.update({
        where: { id },
        data: updateArtistDto,
      });

      return new ArtistEntity(updatedArtist);
    } catch (error) {
      throw new HttpException(
        ERROR_MESSAGE[HttpStatus.NOT_FOUND]('Artist', id),
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.artist.delete({ where: { id } });
    } catch {
      throw new HttpException(
        ERROR_MESSAGE[HttpStatus.NOT_FOUND]('Artist', id),
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
