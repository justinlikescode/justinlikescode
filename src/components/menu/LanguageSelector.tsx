import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@components/shadcn/dropdown-menu";
import { Button } from "@components/shadcn/ui/button.tsx";

export default function LanguageSelector(): React.ReactElement {
    function getLocaleUrl(locale: string = ""): string {
        if (locale == "" && !window.location.pathname.includes("/es")) {
            return window.location.origin + window.location.pathname.replace("/", "");
        }

        // we're cleaning up the pathname to just force es to properly be set
        let pathname = window.location.pathname.replace("/es", "");

        // this way we can dynamically generate languages
        let localeString = locale != "" ? "/" + locale : "";

        return window.location.origin + localeString + pathname;
    }

    /*
     * WARN: DEPRECATED
     **/
    function _getEnglishUrl(): string {
        if (!window.location.pathname.includes("/es"))
            return `${window.location.origin}${window.location.pathname}`;

        let pathname = window.location.pathname;

        pathname = pathname.replace("/es", "");

        if (pathname.charAt(0) != "/") {
            pathname = "/" + pathname;
        }

        return window.location.origin + pathname;
    }

    /*
     * WARN: DEPRECATED
     **/
    function _getSpanishUrl(): string {
        let pathname = window.location.pathname;

        if (pathname.charAt(0) != "/") {
            pathname = "/" + pathname;
        }

        return `${window.location.origin}/es${pathname}`;
    }

    function getCurrentLang(): string {
        return window.location.href.includes("/es") ? "es" : "en";
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
                    <DropdownMenuItem className="cursor-pointer">
                        <a href={getLocaleUrl()}>English</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                        <a href={getLocaleUrl("es")}>Español</a>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
