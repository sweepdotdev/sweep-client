import { Context, createContext, MutableRefObject, ReactNode, useContext, useRef } from "react";
import { createStore, StoreApi, useStore } from "zustand";

interface SessionState {
    valid: boolean;
    expires: Date;
    setValid: (value: boolean) => void;
    setExpiry: (value: Date) => void;
}

const StoreContext: Context<StoreApi<SessionState> | null> =
    createContext<StoreApi<SessionState> | null>(null);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
    const storeRef: MutableRefObject<StoreApi<SessionState> | undefined> = useRef();
    if (!storeRef.current) {
        storeRef.current = createStore<SessionState>()((set) => ({
            expires: new Date(),
            valid: false,
            setExpiry: (value: Date) => set(() => ({ expires: value })),
            setValid: (value: boolean) => set(() => ({ valid: value })),
        }));
    }

    return <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>;
};

export const useStoreInContext = <T,>(selector: (state: SessionState) => T) => {
    const store: StoreApi<SessionState> | null = useContext(StoreContext);

    if (!store) {
        throw new Error("Missing StoreProvider");
    }

    return useStore(store, selector);
};
