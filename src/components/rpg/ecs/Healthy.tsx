import { useObservable } from "@legendapp/state/react";
import { createContext } from "@sgty/kontext-react";

export type HealthBarOptions = {
	health: number;
	maxHealth: number;
	armor?: number;
};

export function useHealthBar({
	health,
	maxHealth,
	armor = 0,
}: HealthBarOptions) {
	const state$ = useObservable({ health, maxHealth, armor });
	const isDead$ = useObservable(() => state$.health.get() <= 0);

	function heal(amt: number) {
		state$.health.set((prev) => Math.min(maxHealth, prev + amt));
	}

	function damage(amt: number) {
		state$.health.set((prev) => Math.max(0, prev - (amt - state$.armor.get())));
	}

	return {
		state$,
		isDead$,

		damage,
		heal,
	};
}

export const HealthyContext = createContext(
	({ healthBar }: { healthBar: HealthBar }) => {
		return healthBar;
	},
);

export type HealthBar = ReturnType<typeof useHealthBar>;
