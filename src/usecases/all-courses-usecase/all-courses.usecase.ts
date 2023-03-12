import { CourseEntity } from "@entities/course";
import { IInputBoundary } from "../itf.input-boundary";
import { IOutputBoundary } from "../itf.output-boundary";
import { ICourseGateway } from "./all-courses.gateway";
import { AllCoursesRequest } from "./all-courses.request";
import { AllCoursesResponse } from "./all-courses.response";

export class AllCoursesUsecase implements IInputBoundary {
    constructor(readonly output: IOutputBoundary, private readonly gateway: ICourseGateway) {}
    async execute(request: AllCoursesRequest): Promise<AllCoursesResponse> {
        let courses: CourseEntity[] = await this.gateway.getAllCourses();
        return new AllCoursesResponse(courses);
    }
}