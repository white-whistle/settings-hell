import { Route } from '..';
import Sandbox1 from './Sandbox1';

export const SettingsRoutes = {
	SANDBOX1: {
		id: 'sandbox1',
		path: '/sandbox1',
		component: Sandbox1,
	},
	SANDBOX2: {
		id: 'sandbox2',
		path: '/sandbox2',
		component: Sandbox1,
	},
	SANDBOX3: {
		id: 'sandbox3',
		path: '/sandbox3',
		component: Sandbox1,
	},
} satisfies Record<string, Route>;

export const SETTINGS_ROUTES_LIST = Object.values(SettingsRoutes) as Route[];
