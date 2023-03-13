import { InjectQueue } from '@nestjs/bull';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { Queue } from 'bull';
import { User } from 'src/infrastructure/data-source/mysql/typeorm/user.model';
import { Role } from 'src/infrastructure/roles/role.enum';
import { Roles } from 'src/infrastructure/roles/roles.decorator';
import { RolesGuard } from 'src/infrastructure/roles/roles.guard';
import { AllAvailableCoursesRequest } from 'src/usecases/all-available-courses-usecase/all-available-courses.request';
import { AllAvailableCoursesUsecase } from 'src/usecases/all-available-courses-usecase/all-available-courses.usecase';
import { AllCoursesRequest } from 'src/usecases/all-courses-usecase/all-courses.request';
import { AllCoursesUsecase } from 'src/usecases/all-courses-usecase/all-courses.usecase';
import { CreateCourseRequest } from 'src/usecases/create-course-usecase/create-course.request';
import { CreateCourseUsecase } from 'src/usecases/create-course-usecase/create-course.usecase';
import { UpdateCourseRequest } from 'src/usecases/update-course-usecase/update-course.request';
import { UpdateCourseUsecase } from 'src/usecases/update-course-usecase/update-course.usecase';
import { ApiResponse } from '../ApiResponse';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserInfo } from '../user/user.decorator';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { EnrollCourseDto } from './dto/enroll-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService, private readonly apiResponse: ApiResponse, @InjectQueue('course') private readonly enrollQueue: Queue) { }

  @UseGuards(JwtAuthGuard)
  @Post('register')
  // @Roles(Role.STUDENT)
  async enroll(@Body() enrollCourseDto: EnrollCourseDto) {
    await this.enrollQueue.add('enroll', enrollCourseDto);
    this.apiResponse.success({}, 200, 'Your registration is being processed!');
    return this.apiResponse.ouput();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  // @Roles(Role.ADMIN)
  async create( @UserInfo() user, @Body() createCourseDto: CreateCourseDto) {
    if (!user.roles.includes(Role.ADMIN)) {
      this.apiResponse.fail(new Error("Forbidden"),403,"Forbidden resources!")
      return this.apiResponse.ouput();
    }
    
    try {
      const response = await (new CreateCourseUsecase(this.apiResponse, this.courseService)).execute(new CreateCourseRequest({created_by: user.id,...createCourseDto} as CreateCourseRequest));
      this.apiResponse.success(response, 200);
    }
    catch (e) {
      this.apiResponse.fail(e as Error, 400);
    }
    return this.apiResponse.ouput();

  }

  @Get('get-all-available-courses')
  @UseGuards(JwtAuthGuard)
  async getAllAvailableCourses() {
    try {
      const response = await (new AllAvailableCoursesUsecase(this.apiResponse, this.courseService)).execute(new AllAvailableCoursesRequest());
      this.apiResponse.success(response, 200);
    } catch (e) {
      this.apiResponse.fail(e as Error, 400);
    }
    return this.apiResponse.ouput();
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-all-courses')
  // @Roles(Role.ADMIN)
  async getAllCourses(@UserInfo() user) {
    if (!user.roles.includes(Role.ADMIN)) {
      this.apiResponse.fail(new Error("Forbidden"),403,"Forbidden resources!")
      return this.apiResponse.ouput();
    }
  
    try {
      const response = await (new AllCoursesUsecase(this.apiResponse, this.courseService)).execute(new AllCoursesRequest());
      this.apiResponse.success(response, 200);
    } catch (e) {
      this.apiResponse.fail(e as Error, 400);
    }
    return this.apiResponse.ouput();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto,@UserInfo() user) {
    if (!user.roles.includes(Role.ADMIN)) {
      this.apiResponse.fail(new Error("Forbidden"),403,"Forbidden resources!")
      return this.apiResponse.ouput();
    }
    try {
      const response = await (new UpdateCourseUsecase(this.apiResponse, this.courseService)).execute(new UpdateCourseRequest({ id, ...updateCourseDto }));
      this.apiResponse.success(response, 200);
    } catch (e) {
      this.apiResponse.fail(e as Error, 400);
    }
    return this.apiResponse.ouput();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @UserInfo() user) {
    return this.courseService.remove(user.id, +id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-enroll-courses-history')
  // @Roles(Role.ADMIN)
  async getEnrollCoursesHistory(@UserInfo() user) {
    if (!user.roles.includes(Role.ADMIN)) {
      this.apiResponse.fail(new Error("Forbidden"),403,"Forbidden resources!")
      return this.apiResponse.ouput();
    }
    try {
      const response = await this.courseService.getEnrollCoursesHistory();
      this.apiResponse.success(response, 200);
    } catch (e) {
      this.apiResponse.fail(e as Error, 400);
    }
    return this.apiResponse.ouput();
  }
}
