import { Checkbox, CheckboxProps } from '@mui/material';
import gameComponent from './gameComponent';
import { motion } from 'framer-motion';
import propify from '../../util/propify';

export default gameComponent(
	propify(motion<CheckboxProps>(Checkbox as any), {
		whileHover: { scale: 1.2 },
		whileTap: { scale: 0.9 },
	}),
	({ result, state, setState }) => {
		return {
			disabled: !result.passed,
			checked: state,

			onChange: () => {
				setState((prev: boolean) => !prev);
			},
		};
	}
);
