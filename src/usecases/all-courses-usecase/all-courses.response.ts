import { CourseEntity } from "@entities/course";
import { IResponse } from "../itf.response";

export class AllCoursesResponse implements IResponse {
    constructor(public readonly courses: CourseEntity[]) {}
}