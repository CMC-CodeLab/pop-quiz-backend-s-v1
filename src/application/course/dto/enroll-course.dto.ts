import { IsInt } from "class-validator";
export class EnrollCourseDto {
    @IsInt()
    course_id: number;
    @IsInt()
    student_id: number;
}
