import { JSX, ReactNode } from "preact/compat";
import Home from "./Home";
import Route404 from "./Route404";
import Settings from "./Settings";

export type Route = {
	path: string;
	id: string;
	name?: ReactNode;
	nest?: boolean;
	component: () => JSX.Element;
};



export const Routes = {
	NOT_FOUND: {
		path: "/404",
		id: "404",
		component: Route404,
	},
	HOME: {
		path: "/",
		id: "home",
		component: Home,
	},
	SETTINGS: {
		path: "/settings",
		id: "settings",
		component: Settings,
		nest: true,
	},
} satisfies Record<string, Route>;

export const ROUTES: Route[] = Object.values(Routes);