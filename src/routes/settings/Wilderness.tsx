import { Typography } from "@mui/material";
import Horizontal from "../../components/Horizontal";
import SettingsSkeleton from "../../components/SettingsSkeleton";
import Vertical from "../../components/Vertical";
import { G } from "../../components/game";
import HealthyButton from "../../components/rpg/HealthyButton";
import Regen from "../../components/rpg/ecs/Regen";
import Respawn from "../../components/rpg/ecs/Respawn";
import useProperty from "../../hooks/useProperty";

function Wilderness() {
	const [damage, setDamage] = useProperty("stats.damage");

	return (
		<SettingsSkeleton>
			<Vertical className="gap-4 items-start">
				<Horizontal className="items-center gap-4">
					<Typography>DAMAGE</Typography>
					<G.Button onClick={() => setDamage((prev) => prev - 1)}>-</G.Button>
					{damage}
					<G.Button onClick={() => setDamage((prev) => prev + 1)}>+</G.Button>
				</Horizontal>
				<Horizontal className="gap-4">
					<HealthyButton
						health={5}
						maxHealth={10}
						property="wilderness.stone1"
						variant="outlined"
					/>

					<HealthyButton
						health={5}
						maxHealth={10}
						property="wilderness.stone2"
						variant="outlined"
						color="info"
					>
						<Respawn rate={5} />
					</HealthyButton>

					<HealthyButton
						health={5}
						maxHealth={10}
						armor={1}
						property="wilderness.stone2"
						variant="outlined"
						color="info"
					/>

					<HealthyButton
						health={5}
						maxHealth={10}
						invulnerable
						property="wilderness.stone2"
						variant="outlined"
						color="info"
					/>

					<HealthyButton
						health={5}
						maxHealth={10}
						property="wilderness.stone3"
						variant="outlined"
						color="secondary"
					>
						<Regen amount={1} />
					</HealthyButton>
				</Horizontal>
			</Vertical>
		</SettingsSkeleton>
	);
}

export default Wilderness;
