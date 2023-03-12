import { CourseEntity } from "@entities/course";
import { PartialType } from "@nestjs/mapped-types";
import { IsInt } from "class-validator";
import { IRequest } from "../itf.request";

export class UpdateCourseRequest extends PartialType(CourseEntity) implements IRequest{
    @IsInt()
    id:number;
    constructor(fields?: any)  {
        super();
        Object.assign(this,fields);
    }
}