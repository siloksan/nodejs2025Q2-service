import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AlbumDto, UpdateAlbumDto } from './dto/album.dto';
import { AlbumEntity } from './entities/album.entity';
import { ERROR_MESSAGE } from 'src/common/constants';
import { PrismaService } from 'src/database/prisma-module/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private readonly prisma: PrismaService) {}

  async create(albumDto: AlbumDto) {
    const newAlbum: Omit<AlbumEntity, 'id'> = {
      name: albumDto.name,
      artistId: albumDto.artistId || null,
      year: albumDto.year,
    };

    const album = await this.prisma.album.create({ data: newAlbum });

    return new AlbumEntity(album);
  }

  async findAll() {
    return await this.prisma.album.findMany();
  }

  async findOne(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });

    if (!album) {
      throw new HttpException(
        ERROR_MESSAGE[HttpStatus.NOT_FOUND]('Album', id),
        HttpStatus.NOT_FOUND,
      );
    }

    return new AlbumEntity(album);
  }

  async update(id: string, albumDto: UpdateAlbumDto) {
    try {
      const updatedAlbum = await this.prisma.album.update({
        where: { id },
        data: albumDto,
      });

      return new AlbumEntity(updatedAlbum);
    } catch (error) {
      throw new HttpException(
        ERROR_MESSAGE[HttpStatus.NOT_FOUND]('Album', id),
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.album.delete({ where: { id } });
    } catch {
      throw new HttpException(
        ERROR_MESSAGE[HttpStatus.NOT_FOUND]('Album', id),
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
