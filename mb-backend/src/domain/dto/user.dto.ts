import { IsNumber } from 'class-validator';
 
class UserDto {
  @IsNumber()
  id: number;
}
 
export default UserDto;