import { useEffect, useState } from "preact/hooks";

const THEMES = [
    ["light", "Light"],
    ["dark", "Dark"],
] as [string, string][];

export function initTheme() {
    useEffect(() => {
        setThemeWindowAttr(getThemeFromLocalStorage());
    }, []);
}

function setThemeWindowAttr(theme: string) {
    document.querySelector("html")?.setAttribute("data-theme", theme);
}

function getThemeFromLocalStorage() {
    return localStorage.getItem("theme") || "light";
}

function ThemeController({ ty }: { ty?: "select" | "toggle" }) {
    const [theme, setTheme] = useState(getThemeFromLocalStorage());

    function writeTheme(themeNext: string | null | undefined) {
        if (themeNext === undefined || themeNext === null) {
            writeTheme(THEMES[0][0]);
            return;
        }
        setTheme(themeNext);
    }

    useEffect(() => {
        localStorage.setItem("theme", theme);
        setThemeWindowAttr(theme);
    }, [theme]);

    if (ty === "select") {
        return (
            <select
                className="select w-full max-w-xs"
                value={theme}
                onChange={(e) => {
                    writeTheme(
                        // @ts-ignore
                        e.target.value,
                    );
                }}
            >
                {THEMES.map(([theme, name]) => (
                    <option value={theme}>{name}</option>
                ))}
            </select>
        );
    }

    if (ty === "toggle" || ty === undefined) {
        return (
            <input
                type="checkbox"
                defaultChecked={theme === "dark"}
                onChange={() => {
                    writeTheme(theme === "dark" ? "light" : "dark");
                }}
                className="checkbox"
            />
        );
    }

    return <></>;
}

export default ThemeController;
