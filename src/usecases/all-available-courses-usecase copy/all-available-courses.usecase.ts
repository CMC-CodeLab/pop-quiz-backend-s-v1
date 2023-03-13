import { CourseEntity } from "@entities/course";
import { ICourseGateway } from "../all-available-courses-usecase/all-available-courses.gateway";
import { AllAvailableCoursesRequest } from "../all-available-courses-usecase/all-available-courses.request";
import { AllAvailableCoursesResponse } from "../all-available-courses-usecase/all-available-courses.response";
import { IInputBoundary } from "../itf.input-boundary";
import { IOutputBoundary } from "../itf.output-boundary";

export class AllAvailableCoursesUsecase implements IInputBoundary {
    constructor(readonly output: IOutputBoundary, private readonly gateway: ICourseGateway) {}
    async execute(request: AllAvailableCoursesRequest): Promise<AllAvailableCoursesResponse> {
        let courses: CourseEntity[] = await this.gateway.getAllAvailableCourses();
        return new AllAvailableCoursesResponse(courses);
    }
}