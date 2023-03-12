import { CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity({name:'courses_students'})
export class CoursesStudents {

    @PrimaryColumn()
    course_id: number;
    
    @PrimaryColumn()
    student_id: number;

    @CreateDateColumn()
    created_date: string;
}