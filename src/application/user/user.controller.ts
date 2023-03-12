import { Controller } from '@nestjs/common';
import { ApiResponse } from '../ApiResponse';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,private readonly apiResponse: ApiResponse) {}
}
