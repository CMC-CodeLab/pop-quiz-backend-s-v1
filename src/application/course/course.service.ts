import { CourseEntity } from '@entities/course';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseRegistrationHistory, CourseRegistrationType } from 'src/infrastructure/data-source/mysql/typeorm/course-registration-history.model';
import { Course } from 'src/infrastructure/data-source/mysql/typeorm/course.model';
import { CoursesStudents } from 'src/infrastructure/data-source/mysql/typeorm/courses-students.model';
import { User } from 'src/infrastructure/data-source/mysql/typeorm/user.model';
import { ICourseGateway } from 'src/usecases/all-available-courses-usecase/all-available-courses.gateway';
import { UpdateCourseRequest } from 'src/usecases/update-course-usecase/update-course.request';
import { DataSource, MoreThan, Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { EnrollCourseDto } from './dto/enroll-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService implements ICourseGateway  {
  constructor (@InjectRepository(Course) private courseRepository: Repository<Course>, private dataSource: DataSource)  {}
  async getAllAvailableCourses(): Promise<CourseEntity[]> {
    let courses = await this.courseRepository.find({where:{
      seats_left: MoreThan(0)
    },select:{id:true,course_name:true,seats_left:true}});
    return courses.map((course:Course) => new CourseEntity(course));
  }
  async create(createCourseDto: CreateCourseDto): Promise<CourseEntity>{
    return await this.courseRepository.save({...createCourseDto,seats_left: createCourseDto.maximum_capacity} as CourseEntity);
  }

  async getAllCourses(): Promise<CourseEntity[]> {
    let courses = await this.courseRepository.find();
    return courses.map((course:Course) => new CourseEntity(course));
  }

  async findOne(id: number) {
    return await this.courseRepository.findOne({where:{id},relations:{students:true}},);
  }

  async update(updateCourseDto: UpdateCourseRequest): Promise<CourseEntity> {
    const { id, ...course } = updateCourseDto;
    let res = await this.courseRepository.update(id,course);
    return await this.courseRepository.findOneBy({id});
  }

  async remove(student_id: number, course_id: number) {
    const queryRunner = this.dataSource.createQueryRunner()

    let course = await queryRunner.manager.findOneBy(Course,{id:course_id});
    course.seats_left +=1;
    
    let student = await queryRunner.manager.findOneBy(User,{id: student_id});
    
    // lets now open a new transaction:
    await queryRunner.startTransaction()
    
    try {
      // execute some operations on this transaction:
      await queryRunner.manager.update(Course,course_id,course);
      await queryRunner.manager.softRemove(CoursesStudents,{student_id,course_id});
      await queryRunner.manager.save(CourseRegistrationHistory,{status:CourseRegistrationType.UNREGISTERED,user_name: student.user_name, course_name: course.course_name});

        // commit transaction now:
        await queryRunner.commitTransaction()
    } catch (err) {
        // since we have errors let's rollback changes we made
        await queryRunner.rollbackTransaction()
    } finally {
        // you need to release query runner which is manually created:
        await queryRunner.release()
    }
  }
  async enroll(enrollCourseDto: EnrollCourseDto) {
    // create a new query runner
    const queryRunner = this.dataSource.createQueryRunner()

    let course = await queryRunner.manager.findOneBy(Course,{id:enrollCourseDto.course_id});
    course.number_of_students_enrolled +=1;
    course.seats_left -=1;
    
    let student = await queryRunner.manager.findOneBy(User,{id: enrollCourseDto.student_id});
    
    // lets now open a new transaction:
    await queryRunner.startTransaction()
    
    try {
      // execute some operations on this transaction:
      await queryRunner.manager.update(Course,enrollCourseDto.course_id,course);
      await queryRunner.manager.save(CoursesStudents,enrollCourseDto)
      await queryRunner.manager.save(CourseRegistrationHistory,{status:CourseRegistrationType.REGISTERED,user_name: student.user_name, course_name: course.course_name});

        // commit transaction now:
        await queryRunner.commitTransaction()
    } catch (err) {
        // since we have errors let's rollback changes we made
        await queryRunner.rollbackTransaction()
    } finally {
        // you need to release query runner which is manually created:
        await queryRunner.release()
    }
  }
}
