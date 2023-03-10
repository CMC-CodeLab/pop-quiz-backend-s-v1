import * as E from "fp-ts/lib/Either";
import { IEntity } from "./itf.entity";

class Course implements IEntity {
    id: number;
    course_name: string;
    number_of_students_enrolled: number;
    maximum_capacity: number;
    validate(): E.Either<DomainError, boolean> {
        if (this.number_of_students_enrolled > this.maximum_capacity) return E.left(new DomainError('Course reaches its maximum capacity!'));
        return E.right(true);
    }
}
