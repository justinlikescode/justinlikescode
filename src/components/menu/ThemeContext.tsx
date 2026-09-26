"use client";

import { createContext } from "react";

const ThemeContext = createContext({
    theme: localStorage.getItem("theme") || "light",
    setTheme: (themeString: string) => {
        console.log(themeString);
    },
});

export default ThemeContext;
