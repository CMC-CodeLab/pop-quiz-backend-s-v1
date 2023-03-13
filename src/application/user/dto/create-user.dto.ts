import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsPositive, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @ApiProperty()
    full_name: string;
    
    @IsString()
    @ApiProperty()
    user_name: string;

    @IsString()
    @ApiProperty()
    password: string;

    @IsEmail()
    @ApiProperty()
    email: string;
}
