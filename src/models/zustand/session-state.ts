export interface SessionState {
    loggedIn: boolean;
    expires: Date | null;
    firstName: string;
    lastName: string;
    email: string;
    organization: string;
    stripeClientSecret?: string;
    hasOAuth2Credentials?: boolean;
    avatarUrl: string;
    sub: string;
    iss: string;
}
