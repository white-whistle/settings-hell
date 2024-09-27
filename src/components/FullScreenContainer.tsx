import React from 'preact/compat';

function FullScreenContainer({
	children,
	theme,
}: {
	children: React.ReactNode;
	theme: string;
}) {
	return (
		<div
			className={
				'flex flex-col justify-center items-center top-0 lef-0 w-svw h-svh'
			}
			data-theme={theme}
		>
			{children}
		</div>
	);
}

export default FullScreenContainer;
