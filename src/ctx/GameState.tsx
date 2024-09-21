import { createContext } from "preact";
import { useContext, useState } from "preact/hooks";
import { DEFAULT_GAME_STATE, GAME_CONDITIONS, GameState } from "../core";
import { Condition, evaluateCondtion } from "../core/condition";

type Setter<T> = (value: T) => string | boolean;

function defaultSetterString(): Setter<string> {
    return (_value: string) => true;
}

const GameContext = createContext({
    // localization
    setLocalization: defaultSetterString() as Setter<string>,
    setPreferredLangauge: defaultSetterString() as Setter<string>,
    // user
    setUsername: defaultSetterString() as Setter<string>,
});

export function useGameContext() {
    return useContext(GameContext);
}

function setIfCondition<T>(
    condition: Condition,
    getter: (gameState: GameState) => T,
    setter: (gameState: GameState, value: T) => void,
) {
    return (
        gameState: GameState,
        setGameState: (gameState: GameState) => void,
    ) => {
        return (value: T) => {
            const original = getter(gameState);
            setter(gameState, value);
            const result = evaluateCondtion(condition, gameState);
            if (result === true) {
                setGameState({ ...gameState });
                return true;
            }
            setter(gameState, original);
            return result;
        };
    };
}

function RouterProvider({ children }: { children: React.ReactNode }) {
    const [gameState, setGameState] = useState(DEFAULT_GAME_STATE);

    return (
        <GameContext.Provider
            value={{
                setLocalization: setIfCondition<string | undefined>(
                    GAME_CONDITIONS.localization.localization,
                    (gs) => gs.localization.localization,
                    (gs, value) => (gs.localization.localization = value),
                )(gameState, setGameState),
                setPreferredLangauge: setIfCondition<string | undefined>(
                    GAME_CONDITIONS.localization.localization,
                    (gs) => gs.localization.preferredLanguage,
                    (gs, value) => (gs.localization.preferredLanguage = value),
                )(gameState, setGameState),
                setUsername: setIfCondition<string | undefined>(
                    GAME_CONDITIONS.user.username,
                    (gs) => gs.user.username,
                    (gs, value) => (gs.user.username = value),
                )(gameState, setGameState),
            }}
        >
            {children}
        </GameContext.Provider>
    );
}

export default RouterProvider;
