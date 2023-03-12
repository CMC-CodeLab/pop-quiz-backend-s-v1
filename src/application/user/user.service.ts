import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/infrastructure/data-source/mysql/typeorm/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User)
    private userRepository: Repository<User>) { }
    async findOne(user_name: string): Promise<User> {
        const res = await this.userRepository.findOneBy({user_name});
        return res;
    }
}
