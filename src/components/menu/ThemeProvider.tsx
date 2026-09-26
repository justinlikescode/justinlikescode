"use client";

import { useState } from "react";
import ThemeContext from "./ThemeContext.tsx";

export default function ThemeProvider({ children }: { children: any }) {
    // Initialize state with the default language (or load from localStorage)
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    // The context value includes both the state and the updater function
    const contextValue = {
        theme,
        setTheme,
    };

    return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}
