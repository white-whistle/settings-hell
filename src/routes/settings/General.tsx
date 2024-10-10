import SettingsSkeleton from '../../components/SettingsSkeleton';
import Vertical from '../../components/Vertical';
import conditions from '../../core/conditions';
import { G } from '../../components/game';
import useModal from '../../hooks/useModal';
import GeneralTosModal from '../../modals/GeneralTosModal';
import Button from '../../components/game/Button';
import { updateGameState, useGameState } from '../../hooks/GameState';
import { FormControlLabel, Switch, Typography } from '@mui/material';

function General() {
	const tosModal = useModal(GeneralTosModal);

	return (
		<SettingsSkeleton>
			<Vertical className='gap-4 items-start'>
				<Vertical>
					<G.If
						condition={conditions.general.tos.enabled}
						error={
							<Vertical className='items-center gap-4'>
								<Typography color='error'>
									This section require you agree to its terms
									of service
								</Typography>
								<Button
									variant='outlined'
									color='error'
									onClick={() => {
										tosModal.open();
									}}
								>
									open terms of service
								</Button>
							</Vertical>
						}
					>
						<Typography variant='h6'>Ant buffer</Typography>
						<Typography variant='subtitle1'>
							An important ant storage buffer, some settings may
							use ants from this buffer
						</Typography>
						<AntBuffer />
					</G.If>
				</Vertical>
			</Vertical>
		</SettingsSkeleton>
	);
}

const AntBuffer = () => {
	const state = useGameState((state) => state.general.antBuffer);

	return (
		<Vertical>
			{state.map((s, i) => {
				const checked = s;
				const enabled =
					state?.[i - 1] || (!state.every(Boolean) && i === 0);

				return (
					<FormControlLabel
						key={i}
						label='🐜'
						control={
							<Switch
								disabled={!enabled}
								checked={checked}
								onClick={() =>
									updateGameState((draft) => {
										if (i > 0) {
											draft.general.antBuffer[i - 1] =
												false;
										}
										draft.general.antBuffer[i] =
											!draft.general.antBuffer[i];
									})
								}
							/>
						}
					/>
				);
			})}
		</Vertical>
	);
};

export default General;
