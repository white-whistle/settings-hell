import { Route, Router, Switch } from 'wouter';
import { Routes, ROUTES } from './routes';
import { useHashLocation } from 'wouter/use-hash-location';
import { useGameState } from './hooks/GameState';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { AnimatePresence } from 'framer-motion';

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
				<div
					className={
						'flex flex-col justify-center items-center top-0 lef-0 w-svw h-svh'
					}
					data-theme={theme}
				>
					<AnimatePresence mode='wait'>
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
					</AnimatePresence>
				</div>
			</CssBaseline>
		</ThemeProvider>
	);
}

export default App;
