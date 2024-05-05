import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
  
export class ResetPasswordTokenDto {
  @IsNotEmpty()
  @IsString()
  token: string;
  
  @IsNotEmpty()
  @IsString()
  newPassword: string
}
