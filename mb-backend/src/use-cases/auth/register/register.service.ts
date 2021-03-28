import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/adapters/auth/auth.service';
import RegisterDto from 'src/domain/dto/register.dto';

@Injectable()
export class RegisterService {
    constructor(private readonly authService: AuthService) {}

    async execute(data: RegisterDto) {
        return this.authService.register(data);
    }
}
