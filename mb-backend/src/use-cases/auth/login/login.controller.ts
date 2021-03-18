import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @UseGuards(AuthGuard('local'))
    @Post('auth')
    async execute(@Request() req) {
        return this.loginService.execute(req.user)
    }
}
