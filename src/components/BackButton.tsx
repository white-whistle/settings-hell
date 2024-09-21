import { useLocation } from 'wouter-preact';
import Button from './Button';
import { Routes } from '../routes';

function BackButton() {
	const [, navigate] = useLocation();

	return (
		<Button
			text='Back'
			onClick={() => {
				navigate(Routes.HOME.path);
			}}
		/>
	);
}

export default BackButton;
