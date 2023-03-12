import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { CourseService } from "src/application/course/course.service";
import { EnrollCourseDto } from "src/application/course/dto/enroll-course.dto";

@Processor('course')
export class CourseProcessor {
    constructor(private readonly courseService: CourseService) {}
    @Process('enroll')
    handleRegister(job:Job) {
        const data = job.data as EnrollCourseDto;
        this.courseService.enroll(data);
    }
}