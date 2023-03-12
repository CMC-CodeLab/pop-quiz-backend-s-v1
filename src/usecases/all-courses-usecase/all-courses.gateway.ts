import { CourseEntity } from "@entities/course";

export interface ICourseGateway {
    getAllCourses(): Promise<CourseEntity[]>;
}