import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserService } from './create-user.service';

@Controller('create-user')
export class CreateUserController {
    constructor(private readonly createUserService: CreateUserService) {}

    @Post()
    execute(
        @Body() userData: { email: string; name?: string; password: string }
    ): Promise<User> {
        return this.createUserService.execute(userData)
    }
}
