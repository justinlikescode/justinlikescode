"use client";

import { RoughNotation } from "react-rough-notation";

import { useState, useContext } from "react";

import ThemeContext from "./ThemeContext.tsx";

export default function MenuItem({ href, icon, label, active }: any): any {
    const [isActive, setIsActive] = useState(active);
    const { theme } = useContext(ThemeContext);

    function checkActive(): void {
        if (active) return;

        setIsActive(false);
    }

    return (
        <li className="cursor-pointer">
            <RoughNotation
                type="underline"
                show={isActive}
                animationDuration={350}
                color={theme === "light" ? "var(--color-secondary)" : "var(--color-green)"}
                strokeWidth={2}
            >
                <a
                    href={href}
                    className={`menu-item text-primary hover:text-secondary dark:text-darker-300 dark:hover:text-green ${active ? "active dark:text-green" : ""}`}
                    onMouseEnter={() => setIsActive(true)}
                    onMouseLeave={() => checkActive()}
                >
                    <i className={`nf ${icon} mr-2`}></i>
                    {label}
                </a>
            </RoughNotation>
        </li>
    );
}
