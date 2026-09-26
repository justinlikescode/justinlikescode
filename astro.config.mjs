import { defineConfig, fontProviders } from "astro/config";

import netlify from "@astrojs/netlify";
import tailwindcss from "@tailwindcss/vite";

import alpinejs from "@astrojs/alpinejs";

import react from "@astrojs/react";

const SITE_URL = process.env.MODE == "dev" ? "https://localhost:4321" : process.env.SITE_URL;
// https://astro.build/config
export default defineConfig({
    output: "static",
    prefetch: true,
    site: SITE_URL,
    // trailingSlash: 'never',
    integrations: [alpinejs({ entrypoint: "./src/alpine-entry" }), react()],
    image: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**.justinlikescode.com",
            },
            {
                protocol: "http",
                hostname: "localhost",
                port: "1337",
            },
        ],
    },
    fonts: [
        {
            provider: fontProviders.fontsource(),
            name: "Roboto Slab",
            cssVariable: "--font-roboto-slab",
            weights: ["100 900"],
        },
        {
            provider: fontProviders.local(),
            name: "Symbols Nerd Font",
            cssVariable: "--font-symbols-nerd",
            options: {
                variants: [
                    {
                        weights: ["100 900"],
                        style: "normal",
                        src: ["./src/assets/fonts/Symbols-2048-em.woff2"],
                    },
                ],
            },
        },
    ],
    i18n: {
        locales: ["en", "es"],
        defaultLocale: "en",
    },
    adapter: netlify(),
    vite: {
        plugins: [tailwindcss()],
    },
});
