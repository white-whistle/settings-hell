import { Redirect, Route, Router, Switch } from 'wouter-preact';
import FullScreenContainer from './components/FullScreenContainer';
import { Routes, ROUTES } from './routes';

function App() {
	return (
		<FullScreenContainer>
			<Router>
				<Switch>
					{ROUTES.map((r) => (
						<Route
							path={r.path}
							key={r.id}
							component={r.component}
						/>
					))}

					<Redirect to={Routes.NOT_FOUND.path} />
				</Switch>
			</Router>
		</FullScreenContainer>
	);
}

export default App;
