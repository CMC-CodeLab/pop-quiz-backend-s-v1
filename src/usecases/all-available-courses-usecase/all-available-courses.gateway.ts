import { CourseEntity } from "@entities/course";

export interface ICourseGateway {
    getAllAvailableCourses(): Promise<CourseEntity[]>;
}