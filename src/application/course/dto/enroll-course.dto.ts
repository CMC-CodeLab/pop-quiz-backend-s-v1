import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";
export class EnrollCourseDto {
    @IsInt()
    @ApiProperty()
    course_id: number;
    @IsInt()
    @ApiProperty()
    student_id: number;
}
