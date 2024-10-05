import {
	Checkbox,
	CheckboxProps,
	FormControlLabel,
	FormControlLabelProps,
	FormGroup,
	FormHelperText,
} from '@mui/material';
import gameComponent from './gameComponent';
import { motion } from 'framer-motion';
import propify from '../../util/propify';
import { forwardRef, ReactNode } from 'react';

export const SimpleCheckbox = gameComponent(
	propify(motion.create<CheckboxProps>(Checkbox as any), {
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

type BaseProps = Omit<FormControlLabelProps, 'control'> & {
	helperText?: ReactNode;
	error?: boolean;
	label?: ReactNode;
};
const Base = forwardRef(
	({ error, helperText, ...props }: BaseProps, ref: any) => {
		return (
			<FormGroup>
				<FormControlLabel {...props} control={<Checkbox ref={ref} />} />

				<FormHelperText error={error}>{helperText}</FormHelperText>
			</FormGroup>
		);
	}
);

export default gameComponent(
	propify(motion.create(Base), {
		whileHover: { scale: 1.2 },
		whileTap: { scale: 0.9 },
	}),
	({ result, state, setState }) => {
		return {
			disabled: !result.passed,
			checked: state,
			error: !result.passed,
			helperText: result.errorMessage,

			onChange: () => {
				setState((prev: boolean) => !prev);
			},
		};
	}
);
