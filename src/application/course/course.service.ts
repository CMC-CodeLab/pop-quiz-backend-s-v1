import { CourseEntity } from '@entities/course';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/infrastructure/data-source/mysql/typeorm/course.model';
import { ICourseGateway } from 'src/usecases/all-available-courses-usecase/all-available-courses.gateway';
import { MoreThan, Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService implements ICourseGateway  {
  constructor (@InjectRepository(Course) private courseRepository: Repository<Course>)  {}
  async getAllAvailableCourses(): Promise<CourseEntity[]> {
    let courses = await this.courseRepository.findBy({
      seats_left: MoreThan(0)
    });
    return courses.map((course:Course) => new CourseEntity(course));
  }
  create(createCourseDto: CreateCourseDto) {
    return 'This action adds a new course';
  }

  findAll() {
    return `This action returns all course`;
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
