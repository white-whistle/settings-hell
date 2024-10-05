import { Route } from '..';
import General from './General';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import User from './User';

export const SettingsRoutes = {
	GENERAL: {
		id: 'general',
		path: '/general',
		name: 'General',
		component: General,
		icon: SettingsIcon,
	},
	USER: {
		id: 'user',
		path: '/user',
		name: 'User',
		component: User,
		icon: PersonIcon,
	},
	SANDBOX3: {
		id: 'sandbox3',
		path: '/sandbox3',
		component: General,
	},
} satisfies Record<string, Route>;

export const SETTINGS_ROUTES_LIST = Object.values(SettingsRoutes) as Route[];
