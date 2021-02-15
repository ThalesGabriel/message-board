import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';
 
export class RegisterDto {
  @IsEmail()
  email: string;
 
  @IsString()
  name: string;
 
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
 
export default RegisterDto;