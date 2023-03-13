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
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/infrastructure/roles/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Course, User, CoursesStudents, CourseRegistrationHistory]),BullModule.registerQueue({
    name: 'course',
  }),],
  controllers: [CourseController],
  providers: [{
    provide: APP_GUARD,
    useClass: RolesGuard,
  },CourseService, ApiResponse, CourseProcessor]
})
export class CourseModule {}
