import { Role } from "src/infrastructure/roles/role.enum";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./course.model";


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
    
    @Column({type:"set",enum: Role,default: [Role.STUDENT]})
    roles: Role[]; 

    @OneToMany(() => Course, (course) => course.user)
    courses: Course[];
}
