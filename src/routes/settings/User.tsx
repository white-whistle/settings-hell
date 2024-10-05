import TextField from '../../components/game/TextField';
import SettingsSkeleton from '../../components/SettingsSkeleton';
import Vertical from '../../components/Vertical';

function User() {
	return (
		<SettingsSkeleton>
			<Vertical className='gap-4 items-start'>
				<Vertical>
					<TextField property='user.username' label='Username' />
				</Vertical>
			</Vertical>
		</SettingsSkeleton>
	);
}

export default User;
