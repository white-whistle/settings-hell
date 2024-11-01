import { produce } from "immer";
import { create, type StateCreator } from "zustand";
import { persist, type PersistOptions } from "zustand/middleware";
import type { Paths } from "../types";

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
	wilderness: {
		stone1: boolean;
		stone2: boolean;
		stone3: boolean;
	};

	stats: {
		damage: number;
		magSize: number;
		reloadRate: number;
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
			wilderness: {
				stone1: false,
				stone2: false,
				stone3: false,
			},
			stats: {
				damage: 1,
				magSize: 6,
				reloadRate: 1.5,
			},
			theme: "light",
			noprop: "",
		}),
		{ name: "SettingsHell-GameState" },
	),
);

export type GameStatePath = Paths<GameState>;

export function updateGameState(modifier: (prev: GameState) => void) {
	useGameState.setState(
		produce(useGameState.getState(), (draft) => {
			modifier(draft);
		}),
	);
}
