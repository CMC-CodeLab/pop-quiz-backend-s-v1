import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { pipe } from "fp-ts/lib/function";
import { fromEither } from "fp-ts/lib/OptionT";
import { AppPresenter } from "src/app.presenter";
import { CreateUserRequest } from "../domain/usecase/create-user/create-user.request";
import { CreateUserUsecase } from "../domain/usecase/create-user/create-user.usecase";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, presenter: AppPresenter): Promise<any> {
    return pipe(
      prepareCreateUser(createUserDto),
      TE.fromEither,
      TE.map(createUserRequest),
      TE.chain()
    );
    const createUserUC = new CreateUserUsecase<CreateUserRequest,UserService>(presenter);
    
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }
}
