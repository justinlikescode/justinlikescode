import { getData } from "@lib/helpers";
import { defineCollection } from "astro:content";

/*
 * NOTE: Deprecated
 
import { marked } from "marked";
import { truncateWords } from "@shahid19/stringjs";

function preview(text: string, truncate: number = 0) {
    if (truncate >= 1 && truncate != null) {
        text = truncateWords(text, truncate);
    }

    const marked_down_text = marked.parse(text) as string;
    const cleaned_text = marked_down_text.replace(/<\/?[^>]+(>|$)/g, "");

    return cleaned_text;
}
*/

const menu_items = defineCollection({
    loader: async (): Promise<any> => {
        const menuItemsJson = [
            {
                id: "1",
                label: "about me",
                href: "/about-me",
                icon: "nf-oct-person_fill",
            },
            {
                id: "2",
                label: "portfolio",
                href: "/portfolio",
                icon: "nf-dev-terminal",
            },
            {
                id: "3",
                label: "contact me",
                href: "/contact-me",
                icon: "nf-oct-mail",
            },
        ];

        return menuItemsJson;
    },
});

const blog_posts = defineCollection({
    loader: async () => {
        const data = await getData("blog-posts")
            .then((r) => r.json())
            .then((data) => data.data);

        if (data == null) return {}; // if no data then return empty

        return data.map(({ id: _id, ...data }: any) => {
            return {
                id: data.documentId,
                ...data,
            };
        });
    },
});

const projects = defineCollection({
    loader: async () => {
        const fields = {
            populate: {
                Technology: {
                    populate: "*",
                },
                screenshots: {
                    populate: "*",
                },
            },
        };
        const data = await getData("projects", fields)
            .then((response) => response.json())
            .then((data) => data.data);

        if (data == null) return {};

        return data.map(({ id: _id, ...data }: any) => {
            if (data.screenshots == null) return;

            return {
                id: data.documentId,
                ...data,
            };
        });
    },
});

export const collections = {
    blog: blog_posts,
    projects: projects,
    menuItems: menu_items,
};
