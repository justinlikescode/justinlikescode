"use client";

import { useState, useContext } from "react";
import { RoughNotation } from "react-rough-notation";

import { isHome } from "@lib/helpers";

import ThemeContext from "./ThemeContext.tsx";

export default function Logo(): React.ReactElement {
    const { theme } = useContext(ThemeContext);

    const [active, setActive] = useState(isHome());

    function checkActive(): void {
        if (isHome()) return;

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
                className="text-3xl flex min-w-fit items-center no-underline max-w-8/10"
                onMouseEnter={() => setActive(true)}
                onMouseLeave={() => checkActive()}
            >
                <i className={`nf nf-md-developer_board text-3xl text-primary dark:text-cyan mr-2`}></i>
                <h1 className={`logo-text text-primary dark:text-cyan`}>justinlikescode</h1>
            </a>
        </RoughNotation>
    );
}
