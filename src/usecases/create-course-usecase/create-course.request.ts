import { CourseEntity } from "@entities/course";
import { OmitType } from "@nestjs/mapped-types";
import { IRequest } from "../itf.request";

export class CreateCourseRequest extends OmitType(CourseEntity,['id'] as const) implements IRequest {
    constructor(fields?: CreateCourseRequest) {
        super();
        Object.assign(this, fields);
    }
}