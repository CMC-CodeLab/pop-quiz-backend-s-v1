import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from 'src/infrastructure/data-source/mysql/typeorm/user.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiResponse } from '../ApiResponse';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService,ApiResponse]
})
export class UserModule {}
