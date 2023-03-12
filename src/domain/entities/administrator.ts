import { UserEntity } from "./user";

export class AdministratorEntity extends UserEntity {
    type: 'administrator';
    constructor(fields: AdministratorEntity) {
        super(fields);
    }
}