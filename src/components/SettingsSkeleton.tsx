import { ComponentProps } from 'preact';
import { Menu } from 'react-daisyui';
import { twMerge } from 'tailwind-merge';
import { Link, useRoute } from 'wouter-preact';
import { Routes } from '../routes';
import { SETTINGS_ROUTES_LIST } from '../routes/settings';
import ThemeSwitcher from './ThemeSwitcher';

function SettingsSkeleton({
	children,
	className,
	...rest
}: ComponentProps<'div'>) {
	const [, params] = useRoute('/:tab');

	const selected = (params as any)?.tab ?? SETTINGS_ROUTES_LIST[0].id;

	const selectedRoute = SETTINGS_ROUTES_LIST.find((r) => r.id === selected);
	const selectedName = selectedRoute?.name ?? selected;

	return (
		<div
			className={twMerge(
				'flex flex-col flex-1 w-full h-full',
				className as string
			)}
			{...rest}
		>
			{/* header */}
			<div className='flex p-4 gap-8'>
				<Link to={'~' + Routes.HOME.path} className='btn'>
					Back
				</Link>
				<h1 className='text-4xl'>Settings</h1>

				<div className='flex ml-auto'>
					<ThemeSwitcher />
				</div>
			</div>

			<div className='flex flex-1 w-full p-4 gap-4'>
				{/* aside */}
				<div className='flex flex-row min-w-[250px] bg-base-200 rounded-xl'>
					<Menu className='w-full'>
						{SETTINGS_ROUTES_LIST.map((route) => (
							<Menu.Item>
								<Link
									to={route.path}
									className={twMerge(
										selected === route.id && 'active'
									)}
								>
									{route.name ?? route.id}
								</Link>
							</Menu.Item>
						))}
					</Menu>
				</div>

				{/* content */}
				<div className='flex flex-col flex-1 gap-2'>
					<h2 className='text-3xl p-4 w-full text-center align-center bg-base-100 sticky top-0'>
						{selectedName}
					</h2>

					{children}
				</div>
			</div>
		</div>
	);
}

export default SettingsSkeleton;
