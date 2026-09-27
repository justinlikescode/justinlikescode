import type { MenuItemType } from "@lib/types";

import ThemeProvider from "@components/menu/ThemeProvider.tsx";
import MainMenu from "@components/menu/MainMenu.tsx";
import Logo from "@components/menu/Logo.tsx";
import MobileHamburger from "@components/menu/MobileHamburger.tsx";
import MobileMenu from "@components/menu/MobileMenu.tsx";

import { useState, useRef } from "react";

export default function Header({ items }: { items: MenuItemType[] }): any {
    const mobileMenuRef = useRef<HTMLUListElement>(null);
    const mediaQuery = window.matchMedia("(width <= 48rem)");

    const [isMobile, setIsMobile] = useState(mediaQuery.matches);

    mediaQuery.addEventListener("change", (e: MediaQueryListEvent): void => setIsMobile(e.matches));

    return (
        <ThemeProvider>
            <header className="relative min-h-fit">
                <div className="z-30 transition-colors bg-white dark:bg-black border-b-2 border-b-primary dark:border-b-secondary">
                    <div className="px-4 xl:px-unset xl:container mx-auto w-full flex flex-row justify-between items-center py-3">
                        <Logo />
                        {!isMobile && <MainMenu items={items} />}
                        {isMobile && (
                            <MobileHamburger
                                isMobile={isMobile}
                                mobileMenu={mobileMenuRef as React.RefObject<HTMLUListElement>}
                            />
                        )}
                    </div>
                </div>
                {isMobile && (
                    <MobileMenu
                        items={items}
                        mobileMenu={mobileMenuRef as React.RefObject<HTMLUListElement>}
                    />
                )}
            </header>
        </ThemeProvider>
    );
}
