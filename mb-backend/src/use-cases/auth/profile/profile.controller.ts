import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/adapters/auth/auth.service';
import { JwtAuthGuard } from 'src/adapters/auth/implementation/passport/jwt-auth.guard';

@Controller('profile')
export class ProfileController {

    @UseGuards(JwtAuthGuard)
    @Get('/auth')
    getProfile(@Request() req) {
        return req.user;
    }
}
