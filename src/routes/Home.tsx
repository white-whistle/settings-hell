import { useLocation } from 'wouter-preact';
import Button from '../components/Button';
import Title from '../components/Title';
import { Routes } from '.';

function Home() {
	const [, navigate] = useLocation();
	return (
		<div className='flex flex-col justify-start items-start'>
			<Title text='Main Menu' />
			<Button text='Play' disabled />
			<Button
				text='Settings'
				onClick={() => navigate(Routes.SETTINGS.path)}
			/>
			<Button text='About' onClick={console.log} />
		</div>
	);
}

export default Home;
