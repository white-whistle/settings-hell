import { twMerge } from 'tailwind-merge';
import { Condition } from '../core/Condition';
import { useCondition } from '../hooks/useCondition';

function LED({ condition }: { condition: Condition }) {
	const res = useCondition(condition);
	return (
		<div
			className={twMerge(
				'rounded-full size-4',
				res.passed ? 'bg-green-500' : 'bg-red-500'
			)}
		/>
	);
}

export default LED;
