import { IsEmail, IsNotEmpty } from 'class-validator';
  
export class FrogotPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
  