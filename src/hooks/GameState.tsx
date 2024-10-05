import { produce } from 'immer';
import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

export type GameState = {
	user: {
		username: string;
	};
	general: {
		tos: boolean;
	};

	theme: 'dark' | 'light';

	noprop: '';
};

type MyPersist = (
	config: StateCreator<GameState>,
	options: PersistOptions<GameState, Partial<GameState>>
) => StateCreator<GameState>;

export const useGameState = create<GameState>()(
	(persist as MyPersist)(
		(_set, _get) => ({
			general: {
				tos: false,
			},
			user: {
				username: '',
			},
			theme: 'light',
			noprop: '',
		}),
		{ name: 'SettingsHell-GameState' }
	)
);

export function updateGameState(modifier: (prev: GameState) => void) {
	useGameState.setState(
		produce(useGameState.getState(), (draft) => {
			modifier(draft);
		})
	);
}
