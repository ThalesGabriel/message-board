import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from 'src/adapters/auth/implementation/guard/local-auth.guard';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @UseGuards(LocalAuthGuard)
    @Post('auth')
    async execute(@Request() req) {
        this.loginService.execute(req.user)
    }
}
