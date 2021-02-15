import LoginDto from "src/domain/dto/login.dto";

export interface IAuthInterface {
    validateUser(email: string, pass: string): Promise<any>;
    login(user: LoginDto): Promise<Object>;
}