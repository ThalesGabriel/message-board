import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { User } from '@prisma/client';
import RegisterDto from 'src/domain/dto/register.dto';
import { CreateUserService } from './create-user.service';

@Controller('create-user')
export class CreateUserController {
    constructor(private readonly createUserService: CreateUserService) {}

    @Post()
    execute(
        @Body() userData: RegisterDto
    ): Promise<User | null> {
        return this.createUserService.execute(userData)
    }
}
