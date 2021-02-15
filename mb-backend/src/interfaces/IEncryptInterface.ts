export interface IEncryptInterface {
  execute(password: string): Promise<string>;
  isSamePassword(password: string, hash: string): Promise<boolean>;
}