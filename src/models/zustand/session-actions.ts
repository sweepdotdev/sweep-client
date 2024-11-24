import { SessionState } from "@/models/zustand/session-state";

export interface SessionActions {
    setExpiry: (value: Date) => void;
    clearState: () => void;
    getState: () => SessionState;
    setState: (val: SessionState) => void;
    setHasOAuth2Credentials: (has: boolean) => void;
    setClientSecret: (clientSecret: string) => void;
    setAvatarUrl: (avatarUrl: string) => void;
}
