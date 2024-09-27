import { get, isFunction, set } from 'radash';
import { Get, Paths } from '../types';
import { GameState, useGameState } from './GameState';
import { useCallback } from 'preact/hooks';
import useAsRef from './useAsRef';

export type ValueOrCallback<T> = T | ((prev: T) => T);

export default function useProperty<TPath extends Paths<GameState>>(
	path: TPath
) {
	const state = useGameState<Get<GameState, TPath>>((state) =>
		get(state, path)
	);
	type TState = typeof state;

	const stateRef = useAsRef(state);

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
