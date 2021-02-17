import { Injectable } from '@nestjs/common';
import { IEncryptInterface } from 'src/interfaces/IEncryptInterface';
import { BcryptService } from './implementation/bcrypt/bcrypt.service';

@Injectable()
export class EncryptService implements IEncryptInterface {
    constructor(private readonly bcryptService: BcryptService) {}

    async execute(password): Promise<string> {
        return await this.bcryptService.execute(password)
    }
    
    async isSamePassword(password, hash): Promise<boolean> {
        return this.bcryptService.isSamePassword(password, hash)
    }
}