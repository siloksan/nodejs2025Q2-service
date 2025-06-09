import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TrackDto } from './dto/track.dto';
import { TrackEntity } from './entities/track.entity';
import { ERROR_MESSAGE } from 'src/common/constants';
import { PrismaService } from 'src/database/prisma-module/prisma.service';

@Injectable()
export class TrackService {
  constructor(private readonly prisma: PrismaService) {}

  async create(trackDto: TrackDto) {
    const track = {
      name: trackDto.name,
      albumId: trackDto.albumId || null,
      artistId: trackDto.artistId || null,
      duration: trackDto.duration,
    };

    const newTrack = await this.prisma.track.create({ data: track });

    return new TrackEntity(newTrack);
  }

  async findAll() {
    return await this.prisma.track.findMany();
  }

  async findOne(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id } });

    if (!track) {
      throw new HttpException(
        ERROR_MESSAGE[HttpStatus.NOT_FOUND]('Track', id),
        HttpStatus.NOT_FOUND,
      );
    }

    return new TrackEntity(track);
  }

  async update(id: string, trackDto: TrackDto) {
    try {
      const updatedTrack = await this.prisma.track.update({
        where: { id },
        data: trackDto,
      });

      return new TrackEntity(updatedTrack);
    } catch (error) {
      throw new HttpException(
        ERROR_MESSAGE[HttpStatus.NOT_FOUND]('Track', id),
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.track.delete({ where: { id } });
    } catch {
      throw new HttpException(
        ERROR_MESSAGE[HttpStatus.NOT_FOUND]('Track', id),
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
