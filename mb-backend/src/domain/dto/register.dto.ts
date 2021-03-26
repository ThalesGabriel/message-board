import { IsEmail, IsString, IsNotEmpty, MinLength, IsNumber } from 'class-validator';
 
class RegisterDto {
  @IsNumber()
  id: number;

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