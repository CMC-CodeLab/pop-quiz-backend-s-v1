import { IOutputBoundary } from "./i.output-boundary";

export interface IInputBoundary<T, U> {
  presenter: IOutputBoundary;
  execute(request: T, gateway: U): void;
}
