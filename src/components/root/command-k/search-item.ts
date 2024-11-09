import { ReactElement } from "react";

export interface SearchItem {
    route: string;
    text: string;
    shortcut: string;
    icon: ReactElement;
    separator?: boolean;
}
