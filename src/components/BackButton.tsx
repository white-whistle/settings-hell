import { useLocation } from 'wouter';
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
