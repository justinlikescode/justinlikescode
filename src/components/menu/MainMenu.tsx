"use client";

import MenuItem from "./MenuItem.tsx";
import ToggleMode from "@components/buttons/ToggleVisualTheme.tsx";
import LanguageSelector from "./LanguageSelector.tsx";

import type { MenuItemType } from "@lib/types";

export default function MainMenu({ items }: { items: MenuItemType[] }): any {
    function isActive(href: string): boolean {
        return window.location.pathname.includes(href);
    }

    return (
        <ul className="main-menu">
            {items.map(({ href, label, icon, scrollTo = "" }: MenuItemType, index: number) => (
                <MenuItem
                    key={index}
                    active={isActive(href)}
                    label={label}
                    href={href}
                    icon={icon}
                    scrollTo={scrollTo}
                />
            ))}

            <li className="main-menu-modeToggle">
                <ToggleMode />
            </li>
            {/* <li className="main-menu-language">
                <LanguageSelector />
            </li> */}
        </ul>
    );
}
