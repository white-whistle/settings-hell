import { Button, ButtonProps, Tooltip } from '@mui/material';
import gameComponent from './gameComponent';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

const Base = ({
	tooltip,
	...props
}: ButtonProps & {
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
