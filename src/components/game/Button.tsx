import { Button, Tooltip } from '@mui/material';
import gameComponent from './gameComponent';
import { ComponentProps, ReactNode } from 'preact/compat';
import { motion } from 'framer-motion';

const MotionButton = motion(Button);

const Base = ({
	tooltip,
	...props
}: ComponentProps<typeof MotionButton> & {
	tooltip?: ReactNode;
	component?: any;
}) => {
	return (
		<Tooltip title={tooltip as string}>
			<span>
				{/* @ts-ignore */}
				<Button
					// @ts-ignore
					component={motion.button}
					{...props}
					whileHover={{ scale: 1.2 }}
					whileTap={{ scale: 0.9 }}
					disableRipple
				/>
			</span>
		</Tooltip>
	);
};

export default gameComponent(Base, ({ result }) => {
	return {
		disabled: !result.passed,
		tooltip: result.errorMessage,
	};
});
