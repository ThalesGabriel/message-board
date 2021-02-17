import { Prisma } from "@prisma/client";
import MessageDTO from "src/domain/dto/message.dto";

export interface IMailInterface {
    sendMail(message: MessageDTO): Promise<void>;
    sendWelcomeMessage(data: Prisma.UserCreateInput): Promise<void>;
}
