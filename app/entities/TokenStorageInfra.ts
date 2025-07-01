import * as SecureStore from "expo-secure-store";

export interface TokenStorage {
  getToken(key: string): Promise<string | null>;
  saveToken(key: string, value: string): Promise<void>;
}

export class SecureTokenStorage implements TokenStorage {
  async getToken(key: string) {
    return await SecureStore.getItemAsync(key);
  }

  async saveToken(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
  }
}
