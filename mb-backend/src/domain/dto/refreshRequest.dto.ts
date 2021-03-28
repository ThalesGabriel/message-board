import { IsNotEmpty } from "class-validator";

class RefreshRequestDTO {
  @IsNotEmpty({ message: 'The refresh token is required' })
  readonly refresh_token: string
}

export default RefreshRequestDTO