"use client";

import type { MenuItemType } from "@lib/types";

import ToggleMode from "@components/menu/ToggleVisualTheme";

export default function MobileMenu({
    items,
    mobileMenu,
}: {
    items: MenuItemType[];
    mobileMenu: React.RefObject<HTMLUListElement>;
}) {
    return (
        <ul
            className="mobile-menu border-b-2 border-b-primary dark:border-b-secondary"
            ref={mobileMenu}
        >
            {items.map(({ href, label, icon }: MenuItemType, index: number) => (
                <li key={index} className="border-b border-primary dark:border-darker-400 px-4 py-4">
                    <a href={href} className="text-xl text-primary dark:text-secondary">
                        <i className={`nf ${icon} mr-2`}></i> {label}
                    </a>
                </li>
            ))}

            <li className="border-0! py-4 px-8">
                <ToggleMode />
            </li>
        </ul>
    );
}
