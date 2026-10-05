"use client";

import { useState } from "react";
import ThemeContext from "./ThemeContext.tsx";

export default function ThemeProvider({
    children,
}: {
    children: React.ReactElement;
}): React.ReactElement {
    // Initialize state with the default language (or load from localStorage)
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [loaded, setLoaded] = useState(false);

    // The context value includes both the state and the updater function
    const contextValue = {
        theme,
        setTheme,
        loaded,
        setLoaded,
    };

    return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}
