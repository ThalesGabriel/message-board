import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/adapters/auth/auth.service';
import { JwtAuthGuard } from 'src/adapters/auth/implementation/passport/jwt-auth.guard';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Post('/auth')
    getProfile(@Body() req) {
        return this.profileService.execute(req.refresh_token)
    }
}
