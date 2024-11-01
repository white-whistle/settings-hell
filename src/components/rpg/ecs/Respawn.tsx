import { MS, useTickerEvery } from "../../../core/ticker";
import { HealthyContext } from "./Healthy";
import { LivingContext } from "./Living";

function Respawn({ rate }: { rate: number }) {
	const healthBar = HealthyContext.use();
	const { isDead, setIsDead } = LivingContext.use();

	useTickerEvery(
		MS.SECOND * rate,
		() => {
			healthBar.state$.health.set(healthBar.state$.maxHealth.get());
			setIsDead(false);
		},
		isDead,
	);

	return null;
}

export default Respawn;
