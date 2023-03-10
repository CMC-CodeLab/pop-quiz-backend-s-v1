import * as E from "fp-ts/lib/Either";
export interface IEntity {
    validate(): E.Either<DomainError, boolean>;
}
