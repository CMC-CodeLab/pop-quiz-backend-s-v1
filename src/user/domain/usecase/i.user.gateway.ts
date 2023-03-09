import * as TE from 'fp-ts/lib/TaskEither';
export interface IUserGateway {
  create(user: CreateUserRequest): TE.TaskEither<CreateUserError, boolean>;
}
