import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    course_name: string;

    @Column()
    number_of_students_enrolled: number;

    @Column()
    seats_left: number;

    @Column()
    maximum_capacity: number;
}