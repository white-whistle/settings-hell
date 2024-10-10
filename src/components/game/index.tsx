import { ComponentProps, PropsWithChildren, ReactNode } from 'react';
import { Condition } from '../../core/Condition';
import Button from './Button';
import Checkbox from './Checkbox';
import TextField from './TextField';
import { useCondition } from '../../hooks/useCondition';
import { twMerge } from 'tailwind-merge';
import { Typography } from '@mui/material';
import Switch from './Switch';

export const G = {
	Button,
	Checkbox,
	Switch,
	TextField,

	If: ({
		condition,
		className,
		children,
		not = false,
		error,
		...rest
	}: PropsWithChildren<{
		condition: Condition;
		not?: boolean;
		error?: ReactNode;
	}> &
		ComponentProps<'div'>) => {
		const result = useCondition(condition);

		return (
			<div className={twMerge('relative', className)} {...rest}>
				{children}

				{(not ? result.passed : !result.passed) && (
					<div className='absolute inset-0 backdrop-blur-[8px] border border-1 border-red-500 rounded-md flex items-center justify-center p-4 bg-surface-mid/75'>
						<Typography color='error'>
							{error ?? result.errorMessage}
						</Typography>
					</div>
				)}
			</div>
		);
	},
};
