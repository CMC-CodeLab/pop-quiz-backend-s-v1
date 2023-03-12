import { TaskEither } from "fp-ts/lib/TaskEither";
import { IOutputBoundary } from "./itf.output-boundary";
import { IRequest } from "./itf.request";
import { IResponse } from "./itf.response";
export interface IInputBoundary {
    output: IOutputBoundary;
    execute(request: IRequest): Promise<IResponse>;
}