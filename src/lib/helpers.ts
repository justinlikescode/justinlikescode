import qs from "qs";

const API_URL = import.meta.env.SECRET_API_URL;
const BEARER_TOKEN = `Bearer ${import.meta.env.SECRET_API_TOKEN}`;

export async function getData(
    endpoint: string,
    endpointParameters: object = {},
): Promise<Response> {
    const queryString = qs.stringify(endpointParameters, { encode: false, addQueryPrefix: true });

    return await fetch(`${API_URL}/api/${endpoint + queryString}`, {
        method: "GET",
        headers: {
            Authorization: BEARER_TOKEN,
        },
    });
}

export function blogDate(date: Date): string {
    return new Date(date).toLocaleDateString("en-US");
}

export function capitalizeString(stringInput: string) {
    return stringInput.charAt(0).toUpperCase() + stringInput.slice(1);
}

export function getCategoryIcon(categoryId: string): string {
    return ((): string => {
        switch (categoryId) {
            case "ecommerce":
                return "nf-fa-cart_shopping";
            case "b2b":
                return "nf-md-handshake";
            case "medical":
                return "nf-fa-laptop_medical";
            case "government":
                return "nf-cod-law";
            case "banking/credit":
                return "nf-fa-bank";
            default:
                return "nf-md-developer_board";
        }
    })();
}

export function getTechStackIcon(technology: string): string {
    if (technology == null) return "";
    return ((): string => {
        switch (technology.toLowerCase().replaceAll(" ", "").replaceAll(".", "")) {
            case "tailwindcss":
                return "nf-dev-tailwindcss";
            case "wordpress":
                return "nf-dev-wordpress";
            case "woocommerce":
                return "nf-dev-woocommerce";
            case "sass":
                return "nf-md-sass";
            case "react":
                return "nf-md-react";
            case "astro":
                return "nf-md-astro";
            case "alpinejs":
                return "nf-dev-alpinejs";
            case "jquery":
                return "nf-dev-jquery";
            case "vuejs":
                return "nf-seti-vue";
            case "nextjs":
                return "nf-dev-nextjs";
            case "bootstrap":
                return "nf-dev-bootstrap";
            case "laravel":
                return "nf-dev-laravel";
            case "angular":
                return "nf-dev-angular";
            case "iconicframework":
                return "nf-dev-ionic";
            case "craftcms":
                return "nf-md-alpha_c_circle";
            case "shopify":
            case "craftcommerce":
                return "nf-md-alpha_s_circle";
            default:
                return "nf-dev-terminal";
        }
    })();
}

export function categoryTitle(categoryId: string): string {
    if (categoryId.includes("2")) {
        return categoryId
            .split("2")
            .map((word) => capitalizeString(word))
            .join("2");
    }

    if (!categoryId.includes("/")) {
        return capitalizeString(categoryId);
    }

    return categoryId
        .split("/")
        .map((word) => capitalizeString(word))
        .join("/");
}
