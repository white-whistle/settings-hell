import {
	FormControlLabel,
	FormControlLabelProps,
	FormGroup,
	FormHelperText,
	Switch,
} from '@mui/material';
import gameComponent from './gameComponent';
import { forwardRef, ReactNode } from 'react';

type BaseProps = Omit<FormControlLabelProps, 'control' | 'label'> & {
	helperText?: ReactNode;
	error?: boolean;
	label?: ReactNode;
};
const Base = forwardRef(
	({ error, helperText, label, ...props }: BaseProps, ref: any) => {
		return (
			<FormGroup>
				<FormControlLabel
					{...props}
					label={label ?? ''}
					control={<Switch ref={ref} />}
				/>

				<FormHelperText error={error}>{helperText}</FormHelperText>
			</FormGroup>
		);
	}
);

export default gameComponent(Base, ({ result, state, setState }) => {
	return {
		disabled: !result.passed,
		checked: state,
		error: !result.passed,
		helperText: result.errorMessage,

		onChange: () => {
			setState((prev: boolean) => !prev);
		},
	};
});
