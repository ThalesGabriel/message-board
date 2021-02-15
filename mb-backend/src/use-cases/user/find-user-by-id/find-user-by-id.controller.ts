import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { User } from '@prisma/client';
import { FindUserByIdService } from './find-user-by-id.service';

@Controller('find-user-by-id')
export class FindUserByIdController {
    constructor(private readonly findUserByIdService: FindUserByIdService) {}

    @Get("/:id")
    execute(@Param('id') id: Number): Promise<User> {
        return this.findUserByIdService.execute(id)
    }
}
