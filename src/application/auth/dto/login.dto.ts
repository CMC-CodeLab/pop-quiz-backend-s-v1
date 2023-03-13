import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginDto {
    @IsString()
    @ApiProperty()
    user_name: string;
    
    @IsString()
    @ApiProperty()
    password: string;
}