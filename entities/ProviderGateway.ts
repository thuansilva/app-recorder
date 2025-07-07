import { AuthService, Strategy } from "./Auth";

export class ClerkAuthSessionService<
  TSetActive extends (params: { session: string }) => void = (params: {
    session: string;
  }) => void
> implements AuthService<TSetActive>
{
  async signOut(signOut: any, isSignedIn: boolean): Promise<void> {
    try {
      if (isSignedIn) {
        await signOut();
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  async signUp(
    createdSessionId: string | null,
    setActive?: TSetActive,
    signIn?: any,
    provider?: Strategy
  ): Promise<void> {
    try {
      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId });
        // return { type: "ActivateSession", sessionId: createdSessionId };
      }
    } catch (error) {
      console.log("error ao fazer login", error);
    }
  }
}
