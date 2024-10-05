import SettingsSkeleton from '../../components/SettingsSkeleton';
import Vertical from '../../components/Vertical';
import conditions from '../../core/conditions';
import { G } from '../../components/game';
import useModal from '../../hooks/useModal';
import TosModal from '../../modals/TosModal';
import Button from '../../components/game/Button';

function General() {
	const tosModal = useModal(TosModal);
	return (
		<SettingsSkeleton>
			<Vertical className='gap-4 items-start'>
				<Vertical>
					<G.Checkbox
						label='Terms of Service'
						condition={conditions.user.username.agreesTos}
						property='general.tos'
					/>
					<G.Checkbox
						label='Terms of Service'
						condition={conditions.user.username.agreesTos}
						property='general.tos'
					/>
					<Button
						onClick={() => {
							tosModal.open({});
						}}
					>
						TOS
					</Button>
				</Vertical>
			</Vertical>
		</SettingsSkeleton>
	);
}

export default General;
