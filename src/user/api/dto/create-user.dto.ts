import { IsString } from 'class-validator';
import { IsEmail } from 'class-validator/types/decorator/decorators';
export class CreateUserDto {
  @IsString()
  userName!: string;

  @IsEmail()
  email?: string;
}
