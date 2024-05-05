import { IsArray, IsString } from 'class-validator';

export class SendEmailDto {
  @IsArray()
  to: string[];

  @IsString()
  subject: string;

  @IsString()
  text: string;
}