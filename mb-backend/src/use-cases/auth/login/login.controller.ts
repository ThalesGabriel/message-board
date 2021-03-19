import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from 'src/adapters/auth/implementation/passport/local-auth.guard';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @UseGuards(LocalAuthGuard)
    @Post('auth')
    async execute(@Request() req) {
        return this.loginService.execute(req.user)
    }
}
