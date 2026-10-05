import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@components/shadcn/dropdown-menu";
import { Button } from "@components/shadcn/ui/button.tsx";

export default function LanguageSelector(): React.ReactElement {
    function getEnglishUrl(): string {
        //
        if (!window.location.pathname.includes("/es"))
            return `${window.location.origin}${window.location.pathname}`;

        let pathname = window.location.pathname;

        pathname = pathname.replace("/es", "");

        if (pathname.charAt(0) != "/") {
            pathname = "/" + pathname;
        }

        return window.location.origin + pathname;
    }

    function getSpanishUrl(): string {
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
                        <a href={getEnglishUrl()}>English</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                        <a href={getSpanishUrl()}>Español</a>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
