import { Checkbox, CheckboxProps, Form } from 'react-daisyui';
import gameComponent from './gameComponent';
import { ComponentProps, forwardRef, ReactNode } from 'preact/compat';
import { twMerge } from 'tailwind-merge';

const Label = forwardRef<HTMLLabelElement, ComponentProps<typeof Form.Label>>(
	({ children, title, dataTheme, className, ...props }, ref) => {
		return (
			<label
				{...props}
				className={twMerge('label justify-start', className as string)}
			>
				{children}
				<span
					className='label-text cursor-pointer ml-2'
					ref={ref as any}
				>
					{title}
				</span>
			</label>
		);
	}
);

const Base = ({
	label,
	helperText,
	error,
	...rest
}: CheckboxProps & {
	helperText?: ReactNode;
	error?: boolean;
}) => {
	return (
		<div className='flex flex-col'>
			<Form>
				<Label title={label as any}>
					<Checkbox {...rest} />
				</Label>
			</Form>
			{helperText && (
				<p className={twMerge('text-sm', error && 'text-error')}>
					{helperText}
				</p>
			)}
		</div>
	);
};

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

export const SimpleCheckbox = gameComponent(
	Checkbox,
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
