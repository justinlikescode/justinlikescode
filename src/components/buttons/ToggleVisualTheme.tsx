"use client";

import { useState, useEffect } from "react";

export default function ToggleVisualTheme({ className }: { className?: string }) {
    const [theme, setTheme] = useState(localStorage.theme);

    function toggleTheme() {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }

    useEffect((): void => {
        if (theme == undefined || theme == null) return
        localStorage.setItem("theme", theme)
        document.documentElement.dataset.theme = theme
    }, [theme])

    return (
        <div className={`flex items-center justify-center ${className}`}>
            <label>
                <span className="sr-only">Light/Dark Mode</span>
            </label>

            <button className="relative inline-flex w-14 max-w-14 rounded-full p-1 bg-primary dark:bg-darker-700 transition-all cursor-pointer" onClick={() => toggleTheme()}>
                <span className={`bg-white dark:bg-secondary h-6 w-6 rounded-full transition-all relative ${theme == 'light' ? 'translate-x-full' : 'translate-x-0'}`} aria-hidden="true">
                    <i className={`nf ${theme == 'light' ? 'nf-fa-cloud_sun text-primary' : 'nf-fa-cloud_moon text-darker-900'}`}></i>
                </span>
            </button>
        </div>
    )
}
