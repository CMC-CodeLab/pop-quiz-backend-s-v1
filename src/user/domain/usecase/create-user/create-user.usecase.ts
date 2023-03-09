import { IInputBoundary } from "src/core/i.input-boundary";
import { IOutputBoundary } from "src/core/i.output-boundary";
import { IUserGateway } from "../i.user.gateway";
import { CreateUserRequest } from "./create-user.request";

export class CreateUserUsecase<
  T extends CreateUserRequest,
  U extends IUserGateway,
> implements IInputBoundary<T, U>
{
  constructor(public presenter: IOutputBoundary) {}
  execute(request: T, gateway: U): void {
    console.log("hi");
  }
}
