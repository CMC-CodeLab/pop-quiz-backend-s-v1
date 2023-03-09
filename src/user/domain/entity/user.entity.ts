import { Either, left, right } from 'fp-ts/lib/Either';
import { IEntity } from 'src/core/i.entity';

export class User implements IEntity {
  id!: number;
  userName!: string;
  email?: string;
  constructor(fields?: Partial<User>) {
    Object.assign(this, fields);
  }
  public validate(): Either<string[], this> {
    const msg: string[] = [];
    if (typeof this.id !== 'number') msg.push(`${this.id} is not a number`);
    if (msg.length > 0) return left(msg);
    else return right(this);
  }
}
