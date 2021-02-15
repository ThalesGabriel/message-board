import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtImplementationService } from '../jwt-implementation.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private jwtImplementationService: JwtImplementationService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    return await this.jwtImplementationService.validateUser(username, password);
  }
}