import { Body, Controller, Get } from '@nestjs/common';
import { UserDTO } from '../user.dto';
import { FindUserService } from './find-user.service';

@Controller('find-user')
export class FindUserController {
    constructor(private readonly findUserService: FindUserService) {}

    @Get()
    findAll(): string {
        return 'Hello World!'
    }
}