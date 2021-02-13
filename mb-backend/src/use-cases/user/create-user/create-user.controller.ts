import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { ResponseDTO } from 'src/domain/DTO/ResponseDTO';
import { CreateUserService } from './create-user.service';

@Controller('create-user')
export class CreateUserController {
    constructor(private readonly createUserService: CreateUserService) {}

    @Post()
    @ApiResponse({ status: 201, description: 'User has been successfully created.'})
    @ApiResponse({ status: 500, description: 'User already exists.'})
    execute(
        @Body() userData: { email: string; name?: string; password: string }
    ): Promise<User | {}> {
        return this.createUserService.execute(userData)
    }
}
