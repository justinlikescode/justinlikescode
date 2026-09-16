import { marked } from "marked";
import { truncateWords } from "@shahid19/stringjs";

import { getData } from "@lib/helpers";
import { defineCollection } from "astro:content";

function preview(text: string, truncate: number = 0) {
    if (truncate >= 1 && truncate != null) {
        text = truncateWords(text, truncate);
    }

    const marked_down_text = marked.parse(text) as string;
    const cleaned_text = marked_down_text.replace(/<\/?[^>]+(>|$)/g, "");

    return cleaned_text;
}

const menu_items = defineCollection({
    loader: async (): Promise<any> => {
        // const menuItemsJson: MenuItemType[] = [
        const menuItemsJson = [
            /*{
                                                                            label: 'home',
                                                                            href: '/',
                                                                            icon: 'nf-custom-home',
                                                                        },*/
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
        const data = await getData("blog-posts").then((r) => r.json());

        if (data.data == null) return {}; // if no data then return empty

        const posts = data.data;

        // console.log(posts);

        return posts.map(({ ...post }: any) => {
            const { documentId, slug, Date: publishDate, Preview, Content, Title, Blog_Content } = post;
            return {
                id: documentId,
                slug: slug,
                content: Content,
                blogContent: Blog_Content,
                publishDate: publishDate,
                preview: Preview,
                title: Title,
            };
        });
    },
});

const projects = defineCollection({
    loader: async () => {
        const data = await getData(
            "projects?populate=Technology&populate=screenshots&sort=category",
        ).then((response) => response.json());
        // console.log(data)
        if (data.data == null) return {};

        return data.data.map(({ ...project }: any) => {
            // NOTE: this will probably return weird data for now
            const {
                slug,
                preview,
                category,
                description,
                external_url,
                Title,
                updatedAt,
                Technology,
                screenshots = [],
            } = project;

            // let screenshots = project.screenshots != null ? project.screenshots : [];

            return {
                id: project.documentId,
                slug: slug,
                title: Title,
                url: external_url,
                preview: preview,
                description: description,
                screenshots: screenshots,
                updatedAt: updatedAt,
                category: category,
                techStack: Technology,
            };
        });
    },
});

export const collections = {
    blog: blog_posts,
    projects: projects,
    menuItems: menu_items,
};
