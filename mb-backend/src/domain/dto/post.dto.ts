import { IsNumber } from 'class-validator';
 
class PostDto {
  @IsNumber()
  id: number;
}
 
export default PostDto;