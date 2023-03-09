import { Either } from "fp-ts/lib/Either";

export interface IEntity {
  validate: () => Either<string[], any>;
}
