import { IsEmail, IsString, IsNotEmpty, MinLength, IsNumber } from 'class-validator';
 
class FileDto {
  @IsString()
  filename: string;

  @IsString()
  mimetype: string;

  @IsString()
  encoding: string;

  @IsString()
  path: string;

  @IsNumber()
  authorId: number;
}
 
export default FileDto;