import { PartialType } from "@nestjs/mapped-types";
import { User } from "src/user/domain/entity/user.entity";

export class CreateUserResponse extends PartialType(User) {}
