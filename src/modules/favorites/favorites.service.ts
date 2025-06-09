import { HttpException, Injectable } from '@nestjs/common';
import { CODE_STATUS, ERROR_MESSAGE } from 'src/common/constants';
import { EntitiesName } from 'src/common/constants/entities-name';
import { DataBase } from 'src/database/in-memory-db/database.service';
import { PrismaService } from 'src/database/prisma-module/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly db: DataBase,
    private readonly prisma: PrismaService,
  ) {}
  async addToFavorite(entityName: EntitiesName, id: string) {
    try {
      const favoritesId = await this.prisma.favorites.findFirst();

      await this.prisma.favorites.update({
        where: {
          id: favoritesId.id,
        },
        data: {
          [entityName]: {
            connect: { id },
          },
        },
      });

      return 'New record added successfully';
    } catch (error) {
      throw new HttpException(
        ERROR_MESSAGE[CODE_STATUS.NOT_EXIST](entityName.slice(0, -1), id),
        CODE_STATUS.NOT_EXIST,
      );
    }
  }

  async findAll() {
    let favorites = await this.prisma.favorites.findFirst({
      include: {
        albums: true,
        artists: true,
        tracks: true,
      },
    });

    if (!favorites) {
      favorites = await this.prisma.favorites.create({
        data: {
          artists: { create: [] },
          albums: { create: [] },
          tracks: { create: [] },
        },
        include: {
          albums: true,
          artists: true,
          tracks: true,
        },
      });
    }

    return favorites;
  }

  async remove(entityName: EntitiesName, id: string) {
    try {
      const favoritesId = await this.prisma.favorites.findFirst();

      await this.prisma.favorites.update({
        where: {
          id: favoritesId.id,
        },
        data: {
          [entityName]: {
            disconnect: { id },
          },
        },
      });

      return 'record deleted from favorites successfully';
    } catch (error) {
      throw new HttpException(
        ERROR_MESSAGE[CODE_STATUS.NOT_EXIST](entityName.slice(0, -1), id),
        CODE_STATUS.NOT_EXIST,
      );
    }
  }
}
