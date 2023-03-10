import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './application/course/course.module';
import { StudentModule } from './application/student/student.module';
import { CourseModule } from './application/course/course.module';

@Module({
  imports: [CourseModule, StudentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
