import * as E from "fp-ts/lib/Either";
import { IEntity } from "./itf.entity";
export class User implements IEntity {
    id: number;
    full_name: string;
    user_name: string;
    password: string;
    type: 'student' | 'administrator';
    validate(): E.Either<DomainError, boolean> {
        return E.right(true);
    }
    constructor(fields?: User) {
        Object.assign(this, fields);
    }
}