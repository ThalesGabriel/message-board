import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDTO } from '../user.dto';
import { CreateUserService } from './create-user.service';

@Controller('create-user')
export class CreateUserController {
    constructor(private readonly createUserService: CreateUserService) {}

    @Post()
    async create( @Body() userData: { name?: string; email: string; password: string; id: number } ): Promise<UserDTO> {
        return this.createUserService.create(userData);
    }
}

