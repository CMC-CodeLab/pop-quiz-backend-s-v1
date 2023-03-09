import * as TE from "fp-ts/lib/TaskEither";
export interface IOutputBoundary {
  payload: TE.TaskEither<Error, unknown>;
  toJson: () => void;
}
