"use client";

import { createPortal } from "react-dom";
import { useState } from "react";

import { AnimePresence, AnimePresenceChild } from "@shakibdshy/react-animejs";

export default function GoTop(): React.ReactElement {
    const [show, setShow] = useState(false);

    const scrollOptions: ScrollIntoViewOptions = { behavior: "smooth", block: "start" };

    const scrollTarget = (): React.ReactElement => {
        return <div id="scrollTarget"></div>;
    };

    const observerOptions = {
        root: document,
        threshold: 0.3,
    };

    const topTarget = document.getElementById("top") as HTMLElement;

    const observer = new IntersectionObserver((entries, _observer) => {
        if (!entries[0].isIntersecting) {
            setShow(true);
        } else {
            setShow(false);
        }
    }, observerOptions);

    observer.observe(topTarget);

    return (
        <>
            {createPortal(scrollTarget(), topTarget)}

            <AnimePresence mode="wait">
                {show == true && (
                    <AnimePresenceChild
                        key="scrollTopButton"
                        enter={{ opacity: [0, 1] }}
                        exit={{ opacity: [1, 0] }}
                        duration={150}
                    >
                        <div
                            onClick={() => topTarget.scrollIntoView(scrollOptions)}
                            className="fixed bottom-12 right-6 cursor-pointer z-50 px-1 py-0 rounded-full"
                        >
                            <i className="nf nf-fa-arrow_circle_up text-secondary text-3xl"></i>
                        </div>
                    </AnimePresenceChild>
                )}
            </AnimePresence>
        </>
    );
}
