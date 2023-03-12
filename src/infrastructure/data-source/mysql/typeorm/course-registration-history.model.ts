import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
export enum CourseRegistrationType {
    UNREGISTERED = 'unregistered',
    REGISTERED = 'registered'
}
@Entity()
export class CourseRegistrationHistory {
    @PrimaryGeneratedColumn()
    id: number;
    @CreateDateColumn()
    created_at: string;
    
    @Column()
    course_name: string;

    @Column()
    user_name: string;
    @Column({
        type: "enum",
        enum: CourseRegistrationType,
        default: CourseRegistrationType.REGISTERED
    })
    status: string;
}