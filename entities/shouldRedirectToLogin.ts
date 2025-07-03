// domain/services/shouldRedirectToLogin.ts
export function shouldRedirectToLogin(
  isLoaded: boolean,
  isSignedIn: boolean | undefined
): boolean {
  return isLoaded && !isSignedIn;
}
