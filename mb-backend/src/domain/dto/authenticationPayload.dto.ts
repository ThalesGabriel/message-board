import UserDto from "./user.dto";

class AuthenticationPayloadDTO {
    user: UserDto
    payload: {
      type: string
      token: string
      refresh_token?: string
    }
}

export default AuthenticationPayloadDTO;