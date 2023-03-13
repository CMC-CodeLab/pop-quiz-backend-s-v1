import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { User } from 'src/infrastructure/data-source/mysql/typeorm/user.model';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '30d' },
      }),
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    UserService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
