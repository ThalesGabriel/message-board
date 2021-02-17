import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import MessageDTO from 'src/domain/dto/message.dto';
import { IMailInterface } from 'src/interfaces/IMailInterface';

@Injectable()
export class MailService implements IMailInterface {
    constructor() {}

    async sendMail(message: MessageDTO): Promise<void> {
        return null
    }

    async sendWelcomeMessage(user: Prisma.UserCreateInput): Promise<void> {
        return null
    }
}
