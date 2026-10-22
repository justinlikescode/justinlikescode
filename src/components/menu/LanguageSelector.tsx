import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@components/shadcn/dropdown-menu";
import { Button } from "@components/shadcn/ui/button.tsx";
import { nulldefined } from "@lib/helpers";

export default function LanguageSelector(): React.ReactElement {
    const locales = [
        {
            label: "English",
            locale: "",
        },
        {
            label: "Español",
            locale: "es",
        },
    ];

    const currentLocale = () => {
        return window.location.pathname.split("/").filter((item) => item != "")[0];
    };

    function getLocaleUrl(locale: string = ""): string {
        const origin = window.location.origin;
        const pathname = window.location.pathname;

        if (locale == currentLocale()) {
            return origin + pathname;
        }

        if (nulldefined(locale)) {
            console.log("should be locale", origin, pathname, locale, currentLocale());
            return origin + "/" + locale + pathname;
        }

        return origin + pathname.replace("/" + currentLocale(), "");
    }

    function getCurrentLang(): string {
        const pathname = window.location.pathname.split("/")[1];
        const current_locale = locales.filter((locale) => locale.locale == pathname)[0].locale;

        return current_locale == "" ? "en" : current_locale;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button
                        variant="outline"
                        className="bg-white! dark:border-secondary! dark:bg-darker-700! dark:hover:text-secondary cursor-pointer text-primary dark:text-secondary/70 text-sm"
                    />
                }
            >
                {getCurrentLang()}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white">
                <DropdownMenuGroup>
                    {locales.map(({ label, locale: locale_code }: { label: string; locale: string }) => (
                        <DropdownMenuItem
                            key={locale_code == "" ? "en" : locale_code}
                            className="cursor-pointer"
                        >
                            <a href={getLocaleUrl(locale_code)}>{label}</a>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
