import { Context, createContext, MutableRefObject, ReactNode, useContext, useRef } from "react";
import { createStore, StoreApi, useStore } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface SessionState {
    expires: Date | null;
    firstName: string;
    lastName: string;
    email: string;
    organization: string;
    sub: string;
    iss: string;
}

export interface SessionActions {
    setExpiry: (value: Date) => void;
    clearState: () => void;
    getState: () => SessionState;
    setState: (val: SessionState) => void;
}

const StoreContext: Context<StoreApi<SessionState & SessionActions> | null> =
    createContext<StoreApi<SessionState & SessionActions> | null>(null);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
    const storeRef: MutableRefObject<StoreApi<SessionState & SessionActions> | undefined> =
        useRef();
    if (!storeRef.current) {
        storeRef.current = createStore<SessionState & SessionActions>()(
            persist(
                (set, get) => ({
                    expires: null,
                    firstName: "",
                    lastName: "",
                    email: "",
                    organization: "",
                    sub: "",
                    iss: "",
                    setState: (val: SessionState) =>
                        set((state: SessionState) => Object.assign(state, val)),
                    setExpiry: (value: Date) => set(() => ({ expires: value })),
                    clearState: () =>
                        set(() => ({
                            expires: null,
                            firstName: "",
                            lastName: "",
                            organization: "",
                            sub: "",
                            iss: "",
                        })),
                    getState: () => get(),
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
