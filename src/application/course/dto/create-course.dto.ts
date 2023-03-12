import { IsPositive, IsString } from "class-validator";

export class CreateCourseDto {
    @IsString()
    course_name: string;
    @IsPositive()
    maximum_capacity: number;
}
