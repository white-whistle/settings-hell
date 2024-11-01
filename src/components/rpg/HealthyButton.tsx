import { observer } from "@legendapp/state/react";
import { G } from "../game";
import { useGameState, type GameStatePath } from "../../hooks/GameState";
import useProperty from "../../hooks/useProperty";
import type { ComponentProps } from "react";
import {
	type HealthBarOptions,
	HealthyContext,
	useHealthBar,
} from "./ecs/Healthy";
import { LivingContext } from "./ecs/Living";
import { Badge } from "@mui/material";
import expr from "../../util/expr";

export type HealthyButtonProps = HealthBarOptions & {
	property: GameStatePath;
	regeneration?: number;
	respawn?: number;
	invulnerable?: boolean;
} & ComponentProps<typeof G.Button>;

export function useRespawn() {}

const HealthyButton = observer(
	({
		health,
		maxHealth,
		property: propertyPath,
		armor,
		children,
		invulnerable,
		...rest
	}: HealthyButtonProps) => {
		const healthBar = useHealthBar({ health, maxHealth, armor });
		const [isDead, setIsDead] = useProperty(propertyPath);
		const currentHealth = healthBar.state$.health.get();
		const currentArmor = healthBar.state$.armor.get();
		const damage = useGameState((state) => state.stats.damage);

		return (
			<HealthyContext.Provider healthBar={healthBar}>
				<LivingContext.Provider
					isDead={isDead as boolean}
					setIsDead={setIsDead as any}
				>
					{children}
					<Badge
						invisible={!currentArmor}
						badgeContent={currentArmor}
						color="warning"
					>
						<G.Button
							{...rest}
							onClick={() => {
								if (isDead) return;
								if (invulnerable) return;

								healthBar.damage(damage);
								if (healthBar.isDead$.get()) {
									// @ts-ignore
									setIsDead(true);
								}
							}}
						>
							{expr(() => {
								if (isDead) return "💀";
								if (invulnerable) return "💛";

								return currentHealth;
							})}
						</G.Button>
					</Badge>
				</LivingContext.Provider>
			</HealthyContext.Provider>
		);
	},
);

export default HealthyButton;
