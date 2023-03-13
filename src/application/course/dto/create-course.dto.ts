import { ApiProperty } from "@nestjs/swagger";
import { IsPositive, IsString } from "class-validator";

export class CreateCourseDto {
    @IsString()
    @ApiProperty()
    course_name: string;

    @IsPositive()
    @ApiProperty()
    maximum_capacity: number;
}
