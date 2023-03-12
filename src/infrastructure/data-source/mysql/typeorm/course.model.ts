import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.model";

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    course_name: string;

    @Column({default:0})
    number_of_students_enrolled: number;

    @Column()
    seats_left: number;

    @Column()
    maximum_capacity: number;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;

    @ManyToMany(type => User, { cascade: true })
    @JoinTable({
        name: "courses_students", // table name for the junction table of this relation
        joinColumn: {
            name: "course_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "student_id",
            referencedColumnName: "id"
        }
    })
    students: User[];
}