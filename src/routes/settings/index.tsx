import type { Route } from "..";
import General from "./General";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import User from "./User";
import BlackMarket from "./BlackMarket";
import StorefrontIcon from "@mui/icons-material/Storefront";
import License from "./License";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import Wilderness from "./Wilderness";
import ForestIcon from "@mui/icons-material/Forest";

export const SettingsRoutes = {
	GENERAL: {
		id: "general",
		path: "/general",
		name: "General",
		component: General,
		icon: SettingsIcon,
	},
	USER: {
		id: "user",
		path: "/user",
		name: "User",
		component: User,
		icon: PersonIcon,
	},
	Wilderness: {
		id: "wilderness",
		path: "/wilderness",
		name: "Wilderness",
		component: Wilderness,
		icon: ForestIcon,
	},
	License: {
		id: "license",
		path: "/license",
		name: "License",
		component: License,
		icon: BadgeOutlinedIcon,
	},
	BLACK_MARKET: {
		id: "black_market",
		path: "/black_market",
		name: "Black Market",
		component: BlackMarket,
		icon: StorefrontIcon,
	},
} satisfies Record<string, Route>;

export const SETTINGS_ROUTES_LIST = Object.values(SettingsRoutes) as Route[];
