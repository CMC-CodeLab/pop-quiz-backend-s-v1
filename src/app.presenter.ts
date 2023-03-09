import { Injectable, Res } from "@nestjs/common";
import { Response } from "express";
import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/lib/TaskEither";
import { IOutputBoundary } from "src/core/i.output-boundary";
@Injectable()
export class AppPresenter implements IOutputBoundary {
  payload: TE.TaskEither<Error, unknown>;
  constructor(@Res() private response: Response) {}
  async toJson() {
    pipe(this.payload, TE.map((res) => this.response.json(res)))
    this.payload().TE.map();
    res.fold(
      (e) => this.response.json(e),
      (res) => this.response.json(res),
    );
  }
}
