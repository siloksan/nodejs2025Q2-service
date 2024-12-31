// import { DataBase } from 'src/db/database.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-password.dto';
// import { UserEntity } from './entities/user.entity';
// import { IUserStorage } from './interfaces/user-storage.interface';

// export class UserStorage implements IUserStorage {
//   constructor(private readonly db: DataBase) {
//     console.log('db: ', this.db);
//   }
//   findAll(): UserEntity[] {
//     return Array.from(this.db.users.values());
//     // throw new Error('Method not implemented.');
//   }
//   create(params: CreateUserDto): UserEntity {
//     throw new Error('Method not implemented.');
//   }
//   findOne(id: string): UserEntity {
//     throw new Error('Method not implemented.');
//   }
//   updatePassword(id: string, params: UpdateUserDto): UserEntity {
//     throw new Error('Method not implemented.');
//   }
//   remove(id: string) {
//     throw new Error('Method not implemented.');
//   }
// }
