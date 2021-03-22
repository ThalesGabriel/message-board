import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/adapters/auth/auth.service';
import { JwtAuthGuard } from 'src/adapters/auth/implementation/passport/jwt-auth.guard';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/auth')
    getProfile(@Request() req) {
        console.log(req)
    }
}
