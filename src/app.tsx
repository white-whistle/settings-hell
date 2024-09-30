import { Route, Router, Switch } from 'wouter-preact';
import FullScreenContainer from './components/FullScreenContainer';
import { Routes, ROUTES } from './routes';
import { useHashLocation } from 'wouter-preact/use-hash-location';
import { useGameState } from './hooks/GameState';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});
const lightTheme = createTheme({
	palette: {
		mode: 'light',
	},
});

function App() {
	const theme = useGameState((s) => s.theme);

	return (
		<ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
			<CssBaseline>
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
			</CssBaseline>
		</ThemeProvider>
	);
}

export default App;
