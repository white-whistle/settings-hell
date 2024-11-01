import { get, isFunction, set } from "radash";
import type { Get, Paths } from "../types";
import { type GameState, useGameState } from "./GameState";
import { useCallback } from "react";
import useAsRef from "./useAsRef";

export type ValueOrCallback<T> = T | ((prev: T) => T);

export default function useProperty<TPath extends Paths<GameState>>(
	path: TPath,
) {
	const state = useGameState<Get<GameState, TPath>>((state) =>
		get(state, path),
	);
	type TState = typeof state;

	const stateRef = useAsRef(state);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const setState = useCallback((valueOrCallback: ValueOrCallback<TState>) => {
		let nState: TState;

		if (isFunction(valueOrCallback)) {
			nState = valueOrCallback(stateRef.current);
		} else {
			nState = valueOrCallback;
		}

		useGameState.setState((state) => {
			return set(state, path, nState);
		});
	}, []);

	return [state, setState] as const;
}
