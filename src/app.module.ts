import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './application/course/course.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './application/user/user.module';
import { BullModule } from '@nestjs/bull';
import { AuthModule } from './application/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './infrastructure/roles/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      // load: [configuration],
      isGlobal: true,
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    AuthModule,
    CourseModule,
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule
      ],
      useFactory: async (configService: ConfigService) => ({
        type: "mysql",
        host: configService.get("MYSQL_HOST"),
        port: configService.get("MYSQL_PORT"),
        username: configService.get("MYSQL_USERNAME"),
        password: configService.get("MYSQL_PASSWORD"),
        database: configService.get("MYSQL_DATABASE"),
        // host: "localhost",
        // port: "3306",
        // username: "root",
        // password: "Fiuyjso@1981",
        // database: "regov_school",
        entities: [__dirname + '/**/*.model{.ts,.js}'],
        synchronize: true, //Đồng bộ với database (true: Khai báo entity sẽ ghi đè table)
        logging: false,
        autoLoadEntities: true
      }),
      inject: [ConfigService],
    }), UserModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
