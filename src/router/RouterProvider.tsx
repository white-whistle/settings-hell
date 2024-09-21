import { createContext } from "preact";
import { currentPageRoute, getRouteByPath, Route, ROUTES } from "./routes";
import { useContext, useEffect, useState } from "preact/hooks";

const RouterContext = createContext({
    currentRoute: ROUTES.route404 as Route,
    navigateTo: ((_to: string) => { }) as (to: string) => void,
    back: (() => { }) as () => void,
});

export function useRouter() {
    return useContext(RouterContext);
}

// function RouterProvider({ children }: { children: React.ReactNode }) {
function RouterProvider() {
    const [currentRoute, setCurrentRoute] = useState(currentPageRoute());
    const [routeStack, setRouteStack] = useState<string[]>([]);

    function updateCurrentRoute() {
        setCurrentRoute(currentPageRoute());
    }

    function navigateTo(to: string) {
        window.history.pushState({}, "", to);
        setCurrentRoute(getRouteByPath(to));
        routeStack.push(to);
    }

    function back() {
        function calculateBack(prev: string[]) {
            if (prev.length == 0 || prev.length == 1) {
                return ["/"];
            }
            prev.pop();
            return [...prev];
        }

        setRouteStack((prev) => {
            const next = calculateBack(prev);
            navigateTo(next[next.length - 1]);
            return next;
        });
    }

    useEffect(() => {
        function handlePopState(_event: PopStateEvent) {
            updateCurrentRoute();
        }

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);

    const Comp = currentRoute.component;
    return (
        <RouterContext.Provider value={{ currentRoute, navigateTo, back }}>
            <Comp />
        </RouterContext.Provider>
    );
}

export default RouterProvider;
