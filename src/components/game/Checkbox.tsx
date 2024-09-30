import { Checkbox } from '@mui/material';
import gameComponent from './gameComponent';

export default gameComponent(Checkbox, ({ result, state, setState }) => {
	return {
		disabled: !result.passed,
		checked: state,

		onChange: () => {
			setState((prev: boolean) => !prev);
		},
	};
});
