import { CourseEntity } from "@entities/course";
import { IResponse } from "../itf.response";

export class CreateCourseResponse implements IResponse {
    constructor(public readonly course: CourseEntity) {}
}