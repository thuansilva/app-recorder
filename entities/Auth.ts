export type Strategy = "oauth_google" | "oauth_facebook" | string;

export interface AuthService<TSetActive extends (...args: any[]) => any> {
  signOut(signOut: any, isSignedIn: boolean): Promise<void>;
  signUp(
    createdSessionId: string | null,
    setActive?: TSetActive,
    signIn?: any,
    provider?: Strategy
  ): Promise<void>;
}

export class Auth<TSetActive extends (...args: any[]) => any> {
  constructor(private authService: AuthService<TSetActive>) {}

  async create(
    createdSessionId: string | null,
    setActive?: TSetActive,
    signIn?: any,
    provider?: Strategy
  ): Promise<any> {
    await this.authService.signUp(
      createdSessionId,
      setActive,
      signIn,
      provider
    );
  }
}
