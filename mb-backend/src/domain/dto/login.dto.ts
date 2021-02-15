import { IsEmail, IsString, IsNotEmpty, MinLength, IsNumber } from 'class-validator';
 
export class LoginDto {
  @IsNumber()
  id: number;

  @IsEmail()
  email: string;
 
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
 
export default LoginDto;