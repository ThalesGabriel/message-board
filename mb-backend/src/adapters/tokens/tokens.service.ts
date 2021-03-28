import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { SignOptions, TokenExpiredError } from 'jsonwebtoken'
import RefreshTokenDTO from 'src/domain/dto/refreshToken.dto'
import UserDto from 'src/domain/dto/user.dto'
import { IRefreshTokenInterface } from 'src/interfaces/IRefreshTokenInterface'
import { RefreshTokenService } from 'src/repo/refresh-token/refresh-token.service'
import { UserService } from 'src/repo/user/user.service'

export interface RefreshTokenPayload {
  jti: number;
  sub: number
}

const BASE_OPTIONS: SignOptions = {
  issuer: 'https://my-app.com',
  audience:'https://my-app.com',
}

@Injectable()
export class TokensService {
  constructor(
		private readonly refreshTokenService: RefreshTokenService,
		private readonly jwtService: JwtService,
		private readonly userService: UserService,
	) { }

  public async generateAccessToken(user: UserDto): Promise<string> {

    const opts: SignOptions = {
      ...BASE_OPTIONS,
      subject: String(user.id),
    }

    return this.jwtService.signAsync({}, opts)
  }

  public async generateRefreshToken(user: UserDto, expiresIn: number): Promise<string> {
    const token = await this.refreshTokenService.create(user, expiresIn)

    const opts: SignOptions = {
      ...BASE_OPTIONS,
      expiresIn,
      subject: String(user.id),
      jwtid: String(token.id),
    }

    return this.jwtService.signAsync({}, opts)
  }

	public async resolveRefreshToken(encoded: string): Promise<{ user: UserDto, token: RefreshTokenDTO }> {
    const payload = await this.decodeRefreshToken(encoded)
    const token = await this.getStoredTokenFromRefreshTokenPayload(payload)

    if (!token) {
      throw new UnprocessableEntityException('Refresh token not found')
    }

    if (token.is_revoked) {
      throw new UnprocessableEntityException('Refresh token revoked')
    }

    const user = await this.getUserFromRefreshTokenPayload(payload)

    if (!user) {
      throw new UnprocessableEntityException('Refresh token malformed')
    }

    return { user, token }
  }

  public async createAccessTokenFromRefreshToken (refresh: string): Promise<{ token: string, user: UserDto }> {
    console.log('aqui 2', refresh)
    const { user } = await this.resolveRefreshToken(refresh)

    const token = await this.generateAccessToken(user)

    return { user, token }
  }
  
  private async decodeRefreshToken (token: string): Promise<RefreshTokenPayload> {
    try {
      return await this.jwtService.verifyAsync(token) || null
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnprocessableEntityException('Refresh token expired')
      } else {
        throw new UnprocessableEntityException('Refresh token malformed') 
      }
    }
  }

  private async getUserFromRefreshTokenPayload (payload: RefreshTokenPayload): Promise<UserDto> {
    const subId = payload.sub

    if (!subId) {
      throw new UnprocessableEntityException('Refresh token malformed')
    }

    return this.userService.find({ id: Number(subId)})
  }

  private async getStoredTokenFromRefreshTokenPayload (payload: RefreshTokenPayload): Promise<RefreshTokenDTO | null> {
    const tokenId = payload.jti

    if (!tokenId) {
      throw new UnprocessableEntityException('Refresh token malformed')
    }

    return this.refreshTokenService.findById(Number(tokenId))
  }
}