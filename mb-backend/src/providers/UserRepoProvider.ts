// Persistence/User/UserPersistenceProvider.ts
import { Provider } from "@nestjs/common";
import { UserRepository } from "src/repositories/UserRepository";

export const UserRepoProvider: Provider = {
    provide: 'UserRepo',
    useClass: UserRepository
}