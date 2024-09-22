import { Redirect, Route, Switch } from "wouter-preact";
import Home from "./routes/Home";
import GameStateProvider from "./ctx/GameStateProvider";
import Settings from "./routes/Settings";
import Route404 from "./routes/Route404";
import WorldGenSettings from "./routes/WorldGenSettings";
import { initTheme } from "./components/ThemeController";
import LocalizationSettings from "./routes/LocalizationSettings";

function App() {
    initTheme();

    return (
        <GameStateProvider>
            <Switch>
                <Route path={"/home"}>
                    <Redirect to="/" />
                </Route>
                <Route path={"/index"}>
                    <Redirect to="/" />
                </Route>
                <Route path={"/"} nest>
                    <Route path={"/"}>
                        <Home />
                    </Route>
                    <Route path={"/settings"} nest>
                        <Route path={"/"}>
                            <Settings />
                        </Route>
                        <Route path={"/localization"} nest>
                            <LocalizationSettings />
                        </Route>
                        <Route path={"/world-gen-settings"} nest>
                            <WorldGenSettings />
                        </Route>
                    </Route>
                </Route>
                <Route>
                    <Route404 />
                </Route>
            </Switch>
        </GameStateProvider>
    );
}

export default App;
