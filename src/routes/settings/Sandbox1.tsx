import { FormControlLabel, Typography } from '@mui/material';
import Checkbox from '../../components/game/Checkbox';
import TextField from '../../components/game/TextField';
import Horizontal from '../../components/Horizontal';
import LED from '../../components/LED';
import SettingsSkeleton from '../../components/SettingsSkeleton';
import Vertical from '../../components/Vertical';
import { Condition } from '../../core/Condition';

const c1 = Condition((state) => {
	return Condition.Result.from(
		state.username.includes('hello'),
		'Name must include "hello"'
	);
});

const c2 = Condition((state) => {
	return Condition.Result.from(
		state.username.includes('world'),
		'Name must include "world"'
	);
});

const c3 = Condition((state) => {
	return Condition.Result.from(state.tos, 'ToS must be enabled');
});

const tosCheckboxRequirement = Condition.and(c1, c2);

function Sandbox1() {
	return (
		<SettingsSkeleton>
			<Vertical className='gap-4 items-start'>
				<Vertical>
					<TextField property='username' />
				</Vertical>

				<Vertical>
					<Horizontal className='items-center gap-1'>
						<FormControlLabel
							label='Terms of Service'
							control={
								<Checkbox
									condition={tosCheckboxRequirement}
									property='tos'
								/>
							}
						/>
					</Horizontal>
				</Vertical>

				{/* indications */}
				<Horizontal className='gap-4'>
					<Horizontal className='items-center gap-1'>
						<LED condition={c1} />
						<Typography>hello</Typography>
					</Horizontal>
					<Horizontal className='items-center gap-1'>
						<LED condition={c2} />
						<Typography>world</Typography>
					</Horizontal>
					<Horizontal className='items-center gap-1'>
						<LED condition={c3} />
						<Typography>ToS</Typography>
					</Horizontal>
				</Horizontal>
			</Vertical>
		</SettingsSkeleton>
	);
}

export default Sandbox1;
