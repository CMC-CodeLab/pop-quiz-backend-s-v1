import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './application/student/student.module';
import { CourseModule } from './application/course/course.module';

@Module({
  imports: [CourseModule, StudentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
