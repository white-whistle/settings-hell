import { Button, ButtonProps, Tooltip } from 'react-daisyui';
import gameComponent from './gameComponent';
import { ReactNode } from 'preact/compat';

const Base = ({ tooltip, ...props }: ButtonProps & { tooltip?: ReactNode }) => {
	return (
		<Tooltip
			message={tooltip as string}
			open={!tooltip ? false : undefined}
		>
			{/* @ts-ignore */}
			<Button {...props} />
		</Tooltip>
	);
};

export default gameComponent(Base, ({ result }) => {
	return {
		disabled: !result.passed,
		tooltip: result.errorMessage,
	};
});
