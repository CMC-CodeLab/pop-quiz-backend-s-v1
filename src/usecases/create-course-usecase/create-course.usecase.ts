import { IInputBoundary } from "../itf.input-boundary";
import { IOutputBoundary } from "../itf.output-boundary";
import { ICourseGateway } from "./create-course.gateway";
import { CreateCourseRequest } from "./create-course.request";
import { CreateCourseResponse } from "./create-course.response";

export class CreateCourseUsecase implements IInputBoundary {
    constructor(readonly output: IOutputBoundary, private readonly gateway: ICourseGateway) {}
    async execute(request: CreateCourseRequest): Promise<CreateCourseResponse> {
        let course = await this.gateway.create(request);
        return new CreateCourseResponse(course);
    }
}