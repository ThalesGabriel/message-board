import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import LoginDto from 'src/domain/dto/login.dto';
import { IAuthInterface } from 'src/interfaces/IAuthInterface';
import { UserService } from 'src/repo/user/user.service';
import { EncryptService } from '../encrypt/encrypt.service';
import { JwtService } from '@nestjs/jwt';
import UserDto from 'src/domain/dto/user.dto';
import AuthenticationPayloadDTO from 'src/domain/dto/authenticationPayload.dto';
import RegisterDto from 'src/domain/dto/register.dto';
import { MailService } from '../mail/mail.service';
import { TokensService } from '../tokens/tokens.service';

@Injectable()
export class AuthService implements IAuthInterface {
  // constructor(private readonly jwtImplementationService: JwtImplementationService) {}
  constructor(
    private readonly userService: UserService, 
    private readonly encryptService: EncryptService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly tokensService: TokensService
  ) {}

  private buildResponsePayload (user: UserDto, accessToken: string, refreshToken?: string): AuthenticationPayloadDTO {
    return {
      user: user,
      payload: {
        type: 'bearer',
        token: accessToken,
        ...(refreshToken ? { refresh_token: refreshToken } : {}),
      }
    }
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.find({email});
    if (user) {
			const p = await this.encryptService.isSamePassword(pass, user.password)
			if(p) {
				const { password, ...result } = user;
				return result;
			}
			return null;
    }
    return null;
  }

	async login(user: LoginDto) {
    const token = await this.tokensService.generateAccessToken(user)
    const refresh = await this.tokensService.generateRefreshToken(user, 60 * 60)

    const payload = this.buildResponsePayload(user, token, refresh)

    return {
      status: 'success',
      data: payload,
    }
  }

  async register(registerData: RegisterDto) {
    const userAlreadyExists = await this.userService.find({ email: registerData.email })

    if(userAlreadyExists) throw new HttpException('User email already exists.', HttpStatus.FORBIDDEN);
    
    registerData.password = await this.encryptService.execute(registerData.password)
    
    const newUser = await this.userService.create(registerData);

    const token = await this.tokensService.generateAccessToken(newUser)
    const refresh = await this.tokensService.generateRefreshToken(newUser, 60 * 60)
    const payload = this.buildResponsePayload(newUser, token, refresh)

    await this.mailService.sendWelcomeMessage(registerData)

    return {
      status: 'success',
      data: payload,
    }
  }

  public async refresh(refresh: string) {
    const { user, token } = await this.tokensService.createAccessTokenFromRefreshToken(refresh)

    const payload = this.buildResponsePayload(user, token)

    return {
      status: 'success',
      data: payload,
    }
  }
}