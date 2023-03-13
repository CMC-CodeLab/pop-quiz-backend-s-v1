import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiForbiddenResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Role } from 'src/infrastructure/roles/role.enum';
import { CreateCourseRequest } from 'src/usecases/create-course-usecase/create-course.request';
import { CreateCourseUsecase } from 'src/usecases/create-course-usecase/create-course.usecase';
import { ApiResponse } from '../ApiResponse';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserInfo } from './user.decorator';
import { UserService } from './user.service';
@ApiBearerAuth()
@ApiTags('USER')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,private readonly apiResponse: ApiResponse) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Admin create a student' })
  @ApiForbiddenResponse({status: 403, description: "Forbidden resources!"})
  @ApiUnauthorizedResponse({description: "Unauthorized"})
  // @Roles(Role.ADMIN)
  async create( @UserInfo() user, @Body() createUserDto: CreateUserDto) {
    if (!user.roles.includes(Role.ADMIN)) {
      this.apiResponse.fail(new Error("Forbidden"),403,"Forbidden resources!")
      return this.apiResponse.ouput();
    }
    
    try {
      const user = await this.userService.create(createUserDto);
      this.apiResponse.success(user);
    }
    catch (e) {
      this.apiResponse.fail(e as Error, 400);
    }
    return this.apiResponse.ouput();

  }
}
