import { CourseEntity } from "@entities/course";
import { CreateCourseRequest } from "./create-course.request";

export interface ICourseGateway {
    create(course: CreateCourseRequest): Promise<CourseEntity>;
}