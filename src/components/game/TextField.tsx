import { Input } from 'react-daisyui';
import gameComponent from './gameComponent';

export default gameComponent(Input, ({ result, state, setState }) => {
	return {
		disabled: !result.passed,
		value: state,
		onChange: (e: any) => {
			setState(e.target.value);
		},
	};
});
