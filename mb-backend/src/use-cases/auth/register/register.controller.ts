import { Body, Controller, Post, Request } from '@nestjs/common';
import { RegisterService } from './register.service';

@Controller('register')
export class RegisterController {
    constructor(private readonly registerService: RegisterService) {}

    @Post('auth')
    async execute(@Body() req) {
        return this.registerService.execute(req)
    }
}
