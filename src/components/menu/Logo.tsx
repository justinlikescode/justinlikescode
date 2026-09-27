"use client";

import { useState, useContext } from "react";
import { RoughNotation } from "react-rough-notation";

import ThemeContext from "./ThemeContext.tsx";

export default function Logo() {
    const { theme } = useContext(ThemeContext);
    const [active, setActive] = useState(
        window.location.pathname.includes("/") && window.location.pathname.length == 1,
    );

    function checkActive(): void {
        if (window.location.pathname.includes("/") && window.location.pathname.length == 1) return;

        setActive(false);
    }

    return (
        <RoughNotation
            type="underline"
            show={active}
            animationDuration={350}
            color={theme === "light" ? "var(--color-primary)" : "var(--color-cyan)"}
            strokeWidth={2}
        >
            <a
                href="/"
                className="text-3xl flex items-center no-underline max-w-8/10"
                onMouseEnter={() => setActive(true)}
                onMouseLeave={() => checkActive()}
            >
                <i className={`nf nf-md-developer_board text-3xl text-primary dark:text-cyan mr-2`}></i>
                <h1 className={`text-primary dark:text-cyan`}>justinlikescode</h1>
            </a>
        </RoughNotation>
    );
}
