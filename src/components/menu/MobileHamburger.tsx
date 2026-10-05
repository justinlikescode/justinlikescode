"use client";

import { useState } from "react";

export default function MobileHamburger({
    mobileMenu,
    isMobile,
}: {
    mobileMenu: React.RefObject<HTMLUListElement>;
    isMobile: boolean;
}): React.ReactElement {
    const [active, setActive] = useState(false);

    function openMenu() {
        if (isMobile == false) return;

        setActive(!active);

        mobileMenu.current.classList.toggle("active");
    }

    return (
        <div className={`hamburger ${active ? "active" : ""}`} onClick={openMenu}>
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
        </div>
    );
}
