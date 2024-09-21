import React from 'preact/compat';
import { twMerge } from 'tailwind-merge';

function Vertical(props: React.ComponentProps<'div'>) {
	return (
		<div
			{...props}
			className={twMerge('flex flex-col', props.className as string)}
		/>
	);
}

export default Vertical;
