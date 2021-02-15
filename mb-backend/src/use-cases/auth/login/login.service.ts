import { Injectable, Request } from '@nestjs/common';
import { AuthService } from 'src/adapters/auth/auth.service';
import LoginDto from 'src/domain/dto/login.dto';

@Injectable()
export class LoginService {
    constructor(private readonly authService: AuthService) {}

    async execute(user: LoginDto) {
        return this.authService.login(user);
    }
}
