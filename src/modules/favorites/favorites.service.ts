import { Injectable } from '@nestjs/common';
import { CODE_STATUS } from 'src/common/constants';
import { EntitiesName } from 'src/common/constants/entities-name';
import { DataBase } from 'src/database/database.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly db: DataBase) {}
  addToFavorite(entityName: EntitiesName, id: string) {
    if (!this.db.checkEntityExists(entityName, id)) {
      return { status: CODE_STATUS.NOT_EXIST };
    }

    this.db.addToFavorites(entityName, id);
    return 'New record added successfully';
  }

  findAll() {
    return this.db.getAllFavorites();
  }

  remove(entityName: EntitiesName, id: string) {
    if (!this.db.checkFavoriteExists(entityName, id)) {
      return { status: CODE_STATUS.NOT_FOUND };
    }

    this.db.removeFromFavorites(entityName, id);
    return `This record removes from favorites`;
  }
}
