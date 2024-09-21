import { JSX } from "preact/compat";
import Home from "../routes/Home";
import Route404 from "../routes/Route404";
import Settings from "../routes/Settings";

export type Route = {
    path: string;
    name: string;
    component: () => JSX.Element;
};

export type Routes = {
    routes: Route[];
    route404: Route;
};

export const ROUTES: Routes = {
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home,
        },
        {
            path: "/settings",
            name: "Settings",
            component: Settings,
        },
    ],
    route404: {
        path: "/404",
        name: "404",
        component: Route404,
    },
};

export function getRouteByPath(path: string) {
    const route = ROUTES.routes.find((route) => route.path == path);
    return route || ROUTES.route404;
}

export function currentPageRoute(): Route {
    return getRouteByPath(window.location.pathname);
}
