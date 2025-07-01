// domain/repositories/__tests__/TokenStorageRepository.test.ts
import { TokenStorage } from "../TokenStorageInfra";
import { UseCaseTokenStorage } from "../UseCaseTokenStorage";

describe("TokenStorageRepository", () => {
  let storageMock: jest.Mocked<TokenStorage>;
  let repository: UseCaseTokenStorage;

  beforeEach(() => {
    storageMock = {
      getToken: jest.fn(),
      saveToken: jest.fn(),
    };

    repository = new UseCaseTokenStorage(storageMock);
    jest.clearAllMocks();
  });

  describe("getToken", () => {
    it("deve retornar o token do storage", async () => {
      storageMock.getToken.mockResolvedValue("meu-token");

      const result = await repository.getToken("auth-key");
      expect(storageMock.getToken).toHaveBeenCalledWith("auth-key");
      expect(result).toBe("meu-token");
    });

    it("deve retornar null se storage lançar erro", async () => {
      storageMock.getToken.mockRejectedValue(new Error("Falha"));

      const result = await repository.getToken("auth-key");

      expect(result).toBeNull();
    });
  });

  describe("saveToken", () => {
    it("deve salvar o token no storage", async () => {
      storageMock.saveToken.mockResolvedValue(undefined);

      await repository.saveToken("auth-key", "meu-token");

      expect(storageMock.saveToken).toHaveBeenCalledWith(
        "auth-key",
        "meu-token"
      );
    });

    it("deve capturar erro ao salvar e não lançar", async () => {
      storageMock.saveToken.mockRejectedValue(
        new Error("qualquer erro interno")
      );

      await expect(
        repository.saveToken("auth-key", "meu-token")
      ).rejects.toThrow("Error saving token");
    });
  });
});
