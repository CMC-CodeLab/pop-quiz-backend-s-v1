import { UserEntity } from '@entities/user';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/infrastructure/data-source/mysql/typeorm/user.model';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User)
    private userRepository: Repository<User>) { }
    async findOne(user_name: string): Promise<User> {
        const res = await this.userRepository.findOneBy({user_name});
        return res;
    }
    async create(createUserDto: CreateUserDto): Promise<UserEntity>{
        const password = await bcrypt.hash(createUserDto.password,10);
        return await this.userRepository.save({...createUserDto, password} as unknown as UserEntity);
      }
}
