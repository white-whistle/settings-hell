import { get, isFunction, set } from 'radash';
import { Get, Paths } from '../types';
import { GameState, useGameState } from './GameState';
import { useCallback } from 'react';
import useAsRef from './useAsRef';
import { produce } from 'immer';

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
			return produce(state, (draft) => {
				set(draft, path, nState);
			});
		});
	}, []);

	return [state, setState] as const;
}
