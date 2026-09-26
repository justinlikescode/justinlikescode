import type { MenuItemType } from "@lib/types";

import MainMenu from "@components/menu/MainMenu.tsx";
import MobileHamburger from "@components/menu/MobileHamburger.tsx";
import MobileMenu from "@components/menu/MobileMenu.tsx";

import { useState, useRef } from "react";

export default function Header({ items }: { items: MenuItemType[] }): any {
    const mobileMenuRef = useRef(null);
    const mediaQuery = window.matchMedia("(width <= 768px)");

    const [isMobile, setIsMobile] = useState(mediaQuery.matches);

    mediaQuery.addEventListener("change", (e: MediaQueryListEvent): void => setIsMobile(e.matches));

    return (
        <header className="relative min-h-fit">
            <div className="z-30 transition-colors bg-white dark:bg-black border-b-2 border-b-primary dark:border-b-secondary">
                <div className="px-4 xl:px-unset xl:container mx-auto w-full flex flex-row justify-between items-center py-3">
                    <a href="/" className="text-3xl flex items-center no-underline max-w-8/10">
                        <i className="nf nf-md-developer_board text-3xl text-primary dark:text-cyan mr-2"></i>
                        <h1 className="text-primary dark:text-cyan">justinlikescode</h1>
                    </a>
                    {!isMobile && <MainMenu items={items} />}
                    {isMobile && (
                        <MobileHamburger
                            isMobile={isMobile}
                            mobileMenu={mobileMenuRef as React.RefObject<any>}
                        />
                    )}
                </div>
            </div>
            {isMobile && <MobileMenu items={items} mobileMenu={mobileMenuRef as React.RefObject<any>} />}
        </header>
    );
}
