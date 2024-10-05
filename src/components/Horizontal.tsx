import React from 'react';
import { twMerge } from 'tailwind-merge';

function Horizontal(props: React.ComponentProps<'div'>) {
	return (
		<div
			{...props}
			className={twMerge('flex flex-row', props.className as string)}
		/>
	);
}

export default Horizontal;
