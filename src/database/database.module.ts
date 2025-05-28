import { Global, Module } from '@nestjs/common';
import { DataBase } from './database.service';

@Global()
@Module({
  providers: [DataBase],
  exports: [DataBase],
})
export class DataBaseModule {}
