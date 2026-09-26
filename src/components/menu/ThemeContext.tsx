"use client";

import { createContext } from "react";

const ThemeContext = createContext({
    theme: localStorage.getItem("theme") || "light",
    setTheme: (_themeString: string) => { },
});

export default ThemeContext;
