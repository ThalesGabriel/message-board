import { Injectable } from '@nestjs/common';
import LoginDto from 'src/domain/dto/login.dto';
import { IAuthInterface } from 'src/interfaces/IAuthInterface';
import { JwtImplementationService } from './implementation/jwt-implementation.service';

@Injectable()
export class AuthService implements IAuthInterface {
  constructor(private readonly jwtImplementationService: JwtImplementationService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    return await this.jwtImplementationService.validateUser(email, pass)
  }

	async login(user: LoginDto) {
    return await this.jwtImplementationService.login(user)
  }
}