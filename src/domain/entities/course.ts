import * as E from "fp-ts/lib/Either";
import { IEntity } from "./itf.entity";

export class CourseEntity implements IEntity {
    id: number;
    course_name: string;
    number_of_students_enrolled: number;
    seats_left: number;
    maximum_capacity: number;
    constructor (fields: CourseEntity) {
        Object.assign(this,fields);
    }
}
