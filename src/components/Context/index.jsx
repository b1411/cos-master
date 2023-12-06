import { createContext, useContext, useState } from "react";

const context = createContext({});

export function useRootContext() {
    return useContext(context);
}

export default function ContextProvider({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const data = {
        isSidebarOpen,
        setIsSidebarOpen,
    };

    return <context.Provider value={data}>{children}</context.Provider>;
}
