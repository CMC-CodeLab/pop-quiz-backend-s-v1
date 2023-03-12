import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';
import { ICourseGateway } from 'src/usecases/all-available-courses-usecase/all-available-courses.gateway';
import { AllAvailableCoursesRequest } from 'src/usecases/all-available-courses-usecase/all-available-courses.request';
import { AllAvailableCoursesUsecase } from 'src/usecases/all-available-courses-usecase/all-available-courses.usecase';
import { IOutputBoundary } from 'src/usecases/itf.output-boundary';
import { ApiResponse } from '../ApiResponse';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService, private readonly apiResponse: ApiResponse) {}

  @Post()
  enroll(@Body() enrollCourseDto: CreateCourseDto) {
  }
  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {

  }
  @Get('get-all-available-courses')
  async getAllAvailableCourse() {
    try {
      let response = (new AllAvailableCoursesUsecase(this.apiResponse,this.courseService)).execute(new AllAvailableCoursesRequest());
      this.apiResponse.success(response,200);
    } catch(e) {
      this.apiResponse.fail(e as Error,400);
    }
    this.apiResponse.ouput();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
