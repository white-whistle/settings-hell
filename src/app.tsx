import { Route, Router, Switch } from 'wouter-preact';
import FullScreenContainer from './components/FullScreenContainer';
import { Routes, ROUTES } from './routes';
import { useHashLocation } from 'wouter-preact/use-hash-location';
import { useGameState } from './hooks/GameState';

function App() {
	const theme = useGameState((s) => s.theme);

	return (
		<FullScreenContainer theme={theme}>
			<Router hook={useHashLocation}>
				<Switch>
					{ROUTES.map((r) => (
						<Route
							path={r.path}
							key={r.id}
							component={r.component}
							nest={r.nest}
						/>
					))}

					<Route component={Routes.NOT_FOUND.component} />
				</Switch>
			</Router>
		</FullScreenContainer>
	);
}

export default App;
