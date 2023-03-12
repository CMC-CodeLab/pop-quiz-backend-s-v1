import { CourseEntity } from "@entities/course";
import { IResponse } from "../itf.response";

export class AllAvailableCoursesResponse implements IResponse {
    constructor(public readonly courses: CourseEntity[]) {}
}