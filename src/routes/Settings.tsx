import { Route, Switch } from 'wouter';
import { SETTINGS_ROUTES_LIST } from './settings';

function Settings() {
	return (
		<Switch>
			{SETTINGS_ROUTES_LIST.map((route) => {
				return (
					<Route
						key={route.id}
						path={route.path}
						component={route.component}
					/>
				);
			})}

			<Route component={SETTINGS_ROUTES_LIST[0].component} />
		</Switch>
	);
}

export default Settings;
