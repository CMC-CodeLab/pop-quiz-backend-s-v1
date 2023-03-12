import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
export enum UserType {
    ADMIN = 'Administrator',
    STUDENT = 'Student'
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    full_name: string;

    @Column()
    user_name: string;

    @Column()
    password: string;

    @Column()
    email: string;
    
    @Column({type:"enum",enum: UserType,default: UserType.STUDENT})
    type: string; 
}