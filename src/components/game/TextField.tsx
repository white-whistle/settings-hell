import { TextField } from '@mui/material';
import gameComponent from './gameComponent';

export default gameComponent(TextField, ({ result, state, setState }) => {
	return {
		disabled: !result.passed,
		value: state,
		onChange: (e: any) => {
			setState(e.target.value);
		},
	};
});
