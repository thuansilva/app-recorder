// domain/services/__tests__/shouldRedirectToLogin.test.ts

import { shouldRedirectToLogin } from "../shouldRedirectToLogin";

describe("shouldRedirectToLogin", () => {
  it("deve retornar true se estiver carregado e não autenticado", () => {
    expect(shouldRedirectToLogin(true, false)).toBe(true);
  });

  it("deve retornar false se não estiver carregado", () => {
    expect(shouldRedirectToLogin(false, false)).toBe(false);
  });

  it("deve retornar false se estiver autenticado", () => {
    expect(shouldRedirectToLogin(true, true)).toBe(false);
  });
});
