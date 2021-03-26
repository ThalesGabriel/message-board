import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/adapters/auth/auth.service';

@Injectable()
export class ProfileService {
    constructor(private readonly authService: AuthService) {}

    async execute(refresh_token: string) {
        return this.authService.refresh(refresh_token)
    }
}
