import { Injectable } from '@nestjs/common';
import LoginDto from 'src/domain/dto/login.dto';
import { IAuthInterface } from 'src/interfaces/IAuthInterface';
import { UserService } from 'src/repo/user/user.service';
import { EncryptService } from '../encrypt/encrypt.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements IAuthInterface {
  // constructor(private readonly jwtImplementationService: JwtImplementationService) {}
  constructor(
    private readonly userService: UserService, 
    private readonly encryptService: EncryptService,
    private readonly jwtService: JwtService
  ) {}

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
    const payload = { email: user.email, sub: user.id};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}