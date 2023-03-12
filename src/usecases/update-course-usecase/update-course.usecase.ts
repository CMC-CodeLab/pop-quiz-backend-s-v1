import { IInputBoundary } from "../itf.input-boundary";
import { IOutputBoundary } from "../itf.output-boundary";
import { ICourseGateway } from "./create-course.gateway";
import { UpdateCourseRequest } from "./update-course.request";
import { UpdateCourseResponse } from "./update-course.response";

export class UpdateCourseUsecase implements IInputBoundary {
    constructor(readonly output: IOutputBoundary, private readonly gateway: ICourseGateway) {}
    async execute(request: UpdateCourseRequest): Promise<UpdateCourseResponse> {
        let course = await this.gateway.update( request);
        return new UpdateCourseResponse(course);
    }

}