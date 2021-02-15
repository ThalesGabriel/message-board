import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IEncryptInterface } from 'src/interfaces/IEncryptInterface';

@Injectable()
export class BcryptService implements IEncryptInterface {

    async execute(password): Promise<string> {
        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds);
    }
    
    async isSamePassword(password, hash): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}