import { observer, useObservable } from "@legendapp/state/react";
import { type HealthBar, HealthyContext } from "./Healthy";
import { MS, useTickerEvery } from "../../../core/ticker";

export function useRegen$({
	healthBar,
	regeneration = 0,
	rate = 0.5,
}: { healthBar: HealthBar; regeneration?: number; rate?: number }) {
	const hasRegen$ = useObservable(
		() =>
			(regeneration ?? 0) > 0 &&
			!healthBar.isDead$.get() &&
			healthBar.state$.health.get() < healthBar.state$.maxHealth.get(),
	);

	const hasRegen = hasRegen$.get();

	useTickerEvery(
		MS.SECOND * rate,
		() => {
			healthBar.heal(regeneration ?? 0);
		},
		hasRegen,
	);
}

const Regen = observer(
	({ rate, amount }: { rate?: number; amount?: number }) => {
		const healthBar = HealthyContext.use();
		useRegen$({ rate, regeneration: amount, healthBar });
		return null;
	},
);

export default Regen;
