import React from 'preact/compat';

function InputField({
	title,
	...rest
}: {
	title: string;
} & Omit<React.ComponentProps<'input'>, 'title'>) {
	return (
		<div className='p-2'>
			{title && (
				<p className='text-gray-100 text-2xl font-bold'>{title}</p>
			)}
			<input
				type='text'
				class={
					'text-gray-100 text-xl font-bold border-b-2 bg-transparent border-gray-700 focus:bg-gray-800 focus:outline-none p-1'
				}
				{...rest}
			/>
		</div>
	);
}

export default InputField;
