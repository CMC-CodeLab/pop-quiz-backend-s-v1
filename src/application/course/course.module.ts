import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { ApiResponse } from '../ApiResponse';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/infrastructure/data-source/mysql/typeorm/course.model';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  controllers: [CourseController],
  providers: [CourseService, ApiResponse]
})
export class CourseModule {}
