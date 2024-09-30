import { useLocation } from 'wouter-preact';
import { Routes } from '.';
import { Condition } from '../core/Condition';
import { G } from '../components/game';
import MotionLink from '../components/MotionLink';

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
				<G.Button
					condition={playCondition}
					className='w-[200px]'
					variant='contained'
				>
					Play
				</G.Button>

				<G.Button
					component={MotionLink}
					to={Routes.SETTINGS.path}
					className='w-[200px]'
					variant='contained'
					onClick={() => navigate(Routes.SETTINGS.path)}
				>
					Settings
				</G.Button>

				<G.Button
					onClick={console.log}
					className='w-[200px]'
					variant='contained'
				>
					About
				</G.Button>
			</div>
		</div>
	);
}

export default Home;
