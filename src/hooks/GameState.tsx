import { produce } from "immer";
import { create, type StateCreator } from "zustand";
import { persist, type PersistOptions } from "zustand/middleware";

type Vector<
	N extends number,
	T,
	R extends unknown[] = [],
> = R["length"] extends N ? R : Vector<N, T, [T, ...R]>;

export type GameState = {
	user: {
		username: string;
	};
	general: {
		tos: boolean;
		antBuffer: Vector<10, boolean>;
	};

	theme: "dark" | "light";

	noprop: "";
};

type MyPersist = (
	config: StateCreator<GameState>,
	options: PersistOptions<GameState, Partial<GameState>>,
) => StateCreator<GameState>;

export const useGameState = create<GameState>()(
	(persist as MyPersist)(
		(_set, _get) => ({
			general: {
				tos: false,
				antBuffer: Array.from({ length: 10 }, () => false) as Vector<
					10,
					boolean
				>,
			},
			user: {
				username: "",
			},
			theme: "light",
			noprop: "",
		}),
		{ name: "SettingsHell-GameState" },
	),
);

export function updateGameState(modifier: (prev: GameState) => void) {
	useGameState.setState(
		produce(useGameState.getState(), (draft) => {
			modifier(draft);
		}),
	);
}
