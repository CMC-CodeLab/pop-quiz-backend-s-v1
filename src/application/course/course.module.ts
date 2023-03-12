import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { ApiResponse } from '../ApiResponse';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/infrastructure/data-source/mysql/typeorm/course.model';
import { BullModule } from '@nestjs/bull';
import { CourseProcessor } from 'src/infrastructure/queue/course.processor';
import { User } from 'src/infrastructure/data-source/mysql/typeorm/user.model';
import { CoursesStudents } from 'src/infrastructure/data-source/mysql/typeorm/courses-students.model';
import { CourseRegistrationHistory } from 'src/infrastructure/data-source/mysql/typeorm/course-registration-history.model';

@Module({
  imports: [TypeOrmModule.forFeature([Course, User, CoursesStudents, CourseRegistrationHistory]),BullModule.registerQueue({
    name: 'course',
  }),],
  controllers: [CourseController],
  providers: [CourseService, ApiResponse, CourseProcessor]
})
export class CourseModule {}
