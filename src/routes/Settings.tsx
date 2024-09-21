import BackButton from '../components/BackButton';
import Horizontal from '../components/Horizontal';
import InputField from '../components/InputField';
import LED from '../components/LED';
import Title from '../components/Title';
import Vertical from '../components/Vertical';
import { Condition } from '../core/Condition';
import { updateGameState, useGameState } from '../hooks/GameState';
import { useCondition } from '../hooks/useCondition';

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

function Settings() {
	const username = useGameState((state) => state.username);
	const tosChecked = useGameState((state) => state.tos);

	const r1 = useCondition(c1);
	const r2 = useCondition(c2);
	const r3 = useCondition(tosCheckboxRequirement);

	console.log({ c1, c2, r1, r2 });

	const single = Condition.Result.single(r1, r2);

	return (
		<div className='flex flex-col justify-start items-start'>
			<BackButton />

			<Title text='Settings' />

			<Vertical className='gap-4'>
				<Vertical>
					<InputField
						title='Username'
						value={username}
						onChange={(e: any) =>
							updateGameState(
								(state) => (state.username = e.target.value)
							)
						}
					/>
				</Vertical>

				{/* ToS example 1 - via composed response */}
				<Vertical>
					<Horizontal className='items-center gap-1 text-white'>
						<input
							type='checkbox'
							checked={tosChecked}
							onChange={(e: any) => {
								updateGameState(
									(state) => (state.tos = e.target.checked)
								);
							}}
							disabled={!single.passed}
						/>
						<div>Terms of Service</div>
					</Horizontal>
					{single.errorMessage && (
						<div className='text-red-500'>
							{single.errorMessage}
						</div>
					)}
				</Vertical>

				{/* ToS example 2 - via composed condition */}
				<Vertical>
					<Horizontal className='items-center gap-1 text-white'>
						<input
							type='checkbox'
							checked={tosChecked}
							onChange={(e: any) => {
								updateGameState(
									(state) => (state.tos = e.target.checked)
								);
							}}
							disabled={!r3.passed}
						/>
						<div>Terms of Service</div>
					</Horizontal>
					{single.errorMessage && (
						<div className='text-red-500'>{r3.errorMessage}</div>
					)}
				</Vertical>

				{/* indications */}
				<Horizontal className='gap-4 text-white'>
					<Horizontal className='items-center gap-1'>
						<LED condition={c1} />
						<div>hello</div>
					</Horizontal>
					<Horizontal className='items-center gap-1'>
						<LED condition={c2} />
						<div>world</div>
					</Horizontal>
					<Horizontal className='items-center gap-1'>
						<LED condition={c3} />
						<div>ToS</div>
					</Horizontal>
				</Horizontal>
			</Vertical>
		</div>
	);
}

export default Settings;
