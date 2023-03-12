import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getConnection } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { User } from 'src/infrastructure/data-source/mysql/typeorm/user.model';
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(private userService: UserService, private jwtService: JwtService) { }

  async validateUser(user_name: string, pass: string): Promise<any> {
    const user: User = await this.userService.findOne(user_name);
    if (user) {
      const match = await bcrypt.compare(pass, user.password);
      if (!match) return null;
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: any) {
    const access_token = this.jwtService.sign(user);
    this.logger.log(`TOKEN: ${access_token}`);
    return {
      access_token
    };
  }
  verify(token: string) {
    return this.jwtService.verify(token);
  }
}