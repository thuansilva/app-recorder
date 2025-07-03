import { TokenStorage } from "./TokenStorageInfra";

export class UseCaseTokenStorage {
  constructor(private readonly storage: TokenStorage) {}

  async getToken(key: string): Promise<string | null> {
    try {
      return await this.storage.getToken(key);
    } catch (error) {
      return null;
    }
  }

  async saveToken(key: string, value: string): Promise<void> {
    try {
      await this.storage.saveToken(key, value);
    } catch (error) {
      throw new Error("Error saving token");
    }
  }
}
