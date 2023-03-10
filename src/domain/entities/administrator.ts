import { User } from "./user";

export class Administrator extends User {
    type: 'administrator';
    constructor(fields: Administrator) {
        super(fields);
    }
}