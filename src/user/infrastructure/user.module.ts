import { Module } from "@nestjs/common";
import { UserService } from "../user.service";
import { UserController } from "../api/dto/user.controller";

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
