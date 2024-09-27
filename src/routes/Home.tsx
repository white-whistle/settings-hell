import { Link, useLocation } from 'wouter-preact';
import { Routes } from '.';
import Button from '../components/game/Button';
import { Condition } from '../core/Condition';

const playCondition = Condition.Failed('Not yet implemented');

function Home() {
	const [, navigate] = useLocation();
	return (
		<div
			className='flex flex-col w-full h-full items-center justify-center gap-10'
			data-theme='coffee'
		>
			<h1 className='text-6xl'>Settings Hell</h1>

			<div className='flex flex-col gap-2'>
				<Button
					condition={playCondition}
					className='w-[200px]'
					size='lg'
				>
					Play
				</Button>
				<Link
					to={Routes.SETTINGS.path}
					className='btn w-[200px] btn-lg'
					onClick={() => navigate(Routes.SETTINGS.path)}
				>
					Settings
				</Link>
				<Button onClick={console.log} className='w-[200px]' size='lg'>
					About
				</Button>
			</div>
		</div>
	);
}

export default Home;
