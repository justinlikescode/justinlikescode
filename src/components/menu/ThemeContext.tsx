"use client";

import { createContext } from "react";

const ThemeContext = createContext({
    theme: localStorage.getItem("theme") || "light",
    setTheme: (themeString: string) => {
        console.log(themeString);
    },
    loaded: false,
    setLoaded: (loadedState: boolean) => {
        console.log(loadedState);
    },
});

export default ThemeContext;
