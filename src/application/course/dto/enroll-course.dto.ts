import { IsInt } from "class-validator";
export class EnrollCourseDto {
    @IsInt()
    course_id: number;
    
}
