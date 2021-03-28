import { IsEmail, IsNumber, IsString } from 'class-validator';
 
class UserDto {
  @IsNumber()
  id: number;

  @IsEmail()
  email: string;

  @IsString()
  name: string;
}
 
export default UserDto;