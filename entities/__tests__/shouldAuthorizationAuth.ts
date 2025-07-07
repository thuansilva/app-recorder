import { Auth, AuthService, Strategy } from "../Auth";

describe.only("AuthFlowProvider", () => {
  type SetActive = (session: { session: string }) => void;

  const mockSignUp = jest.fn().mockResolvedValue(undefined);
  const mockService: AuthService<SetActive> = {
    signOut: jest.fn(),
    signUp: mockSignUp,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar ActivateSession quando createdSessionId estiver presente", async () => {
    (mockService.signUp as jest.Mock).mockResolvedValue({
      createdSessionId: "sess-123",
      setActive: jest.fn(),
    });

    const auth = new Auth<SetActive>(mockService);

    const createdSessionId = "abc123";
    const setActive: SetActive = jest.fn();
    const signIn = { user: "john" };
    const provider: Strategy = "oauth_google";

    await auth.create(createdSessionId, setActive, signIn, provider);

    expect(mockSignUp).toHaveBeenCalledWith(
      createdSessionId,
      setActive,
      signIn,
      provider
    );
  });
});
