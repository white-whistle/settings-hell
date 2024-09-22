import { createContext } from "preact";
import { useContext, useState } from "preact/hooks";
import { DEFAULT_GAME_STATE, GameState } from "../core";
import {
    Condition,
    evaluateCondtion as evaluateCondtionSource,
} from "../core/condition";

const GameContext = createContext({
    gameState: DEFAULT_GAME_STATE as GameState,
    modifyGameState: ((_f: (gameState: GameState) => void) => { }) as (
        f: (gameState: GameState) => void,
    ) => void,
    evaluateCondtion: ((_condition: Condition | undefined) => true) as (
        condition: Condition | undefined,
    ) => string | boolean,
});

export function useGame() {
    return useContext(GameContext);
}

function loadGameStateFromLoalStorage(): GameState | undefined {
    const json = window.localStorage.getItem("gameState");
    if (json === null) return undefined;
    try {
        return JSON.parse(json);
    } catch {
        return undefined;
    }
}

function GameStateProvider({ children }: { children: React.ReactNode }) {
    const [gameState, setGameState] = useState(
        loadGameStateFromLoalStorage() || DEFAULT_GAME_STATE,
    );

    function modifyGameState(f: (gameState: GameState) => void) {
        setGameState((gs) => {
            f(gs);
            window.localStorage.setItem("gameState", JSON.stringify(gs));
            return { ...gs };
        });
    }

    function evaluateCondtion(condition: Condition | undefined) {
        if (condition === undefined) return true;
        return evaluateCondtionSource(condition, gameState);
    }

    return (
        <GameContext.Provider
            value={{ gameState, modifyGameState, evaluateCondtion }}
        >
            {children}
        </GameContext.Provider>
    );
}

export default GameStateProvider;
