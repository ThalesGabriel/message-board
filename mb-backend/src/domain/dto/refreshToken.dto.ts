import { IsEmail, IsString, IsNotEmpty, MinLength, IsNumber, IsBoolean, IsDate } from 'class-validator';
 
class RefreshTokenDTO {
  @IsNumber()
  id: number;

  @IsBoolean()
  is_revoked: Boolean;
 
  @IsDate()
  expires: Date
}
 
export default RefreshTokenDTO;