import { Context, createContext, MutableRefObject, ReactNode, useContext, useRef } from "react";
import { createStore, StoreApi, useStore } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { SessionState } from "@/models/zustand/session-state";
import { SessionActions } from "@/models/zustand/session-actions";

const StoreContext: Context<StoreApi<SessionState & SessionActions> | null> =
    createContext<StoreApi<SessionState & SessionActions> | null>(null);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
    const storeRef: MutableRefObject<StoreApi<SessionState & SessionActions> | undefined> =
        useRef();
    if (!storeRef.current) {
        storeRef.current = createStore<SessionState & SessionActions>()(
            persist(
                (set, get) => ({
                    loggedIn: false,
                    expires: null,
                    firstName: "",
                    lastName: "",
                    email: "",
                    organization: "",
                    sub: "",
                    iss: "",
                    stripeClientSecret: undefined,
                    hasOAuth2Credentials: false,
                    avatarUrl: "",
                    setState: (val: SessionState) =>
                        set((state: SessionState) => Object.assign(state, val)),
                    setExpiry: (value: Date) => set(() => ({ expires: value })),
                    setHasOAuth2Credentials: (has: boolean) =>
                        set(() => ({ hasOAuth2Credentials: has })),
                    clearState: () =>
                        set(() => ({
                            loggedIn: false,
                            expires: null,
                            firstName: "",
                            lastName: "",
                            organization: "",
                            sub: "",
                            iss: "",
                        })),
                    getState: () => get(),
                    setClientSecret: (clientSecret: string) => ({
                        stripeClientSecret: clientSecret,
                    }),
                    setAvatarUrl: (avatarUrl: string) => set(() => ({ avatarUrl: avatarUrl })),
                }),
                {
                    name: "sweep-storage",
                    storage: createJSONStorage(() => localStorage),
                },
            ),
        );
    }

    return <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>;
};

export const useStoreInContext = <T,>(selector: (state: SessionState & SessionActions) => T) => {
    const store: StoreApi<SessionState & SessionActions> | null = useContext(StoreContext);

    if (!store) {
        throw new Error("Missing StoreProvider");
    }

    return useStore(store, selector);
};
