import { CourseEntity } from "@entities/course";
import { UpdateCourseRequest } from "./update-course.request";

export interface ICourseGateway {
    update(course: UpdateCourseRequest): Promise<CourseEntity>;
}