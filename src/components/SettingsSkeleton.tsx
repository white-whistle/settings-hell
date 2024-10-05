import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import { Link, useRoute } from 'wouter';
import { Routes } from '../routes';
import { SETTINGS_ROUTES_LIST } from '../routes/settings';
import ThemeSwitcher from './ThemeSwitcher';
import {
	Box,
	IconButton,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { motion } from 'framer-motion';
import MotionLink from './MotionLink';

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
		<motion.div
			className={twMerge(
				'flex flex-col flex-1 w-full h-full',
				className as string
			)}
			{...(rest as any)}
		>
			{/* header */}
			<div className='flex p-4 gap-8 items-center'>
				<IconButton
					component={MotionLink}
					to={'~' + Routes.HOME.path}
					className='btn'
					whileHover={{ scale: 1.2 }}
					whileTap={{ scale: 0.9 }}
				>
					<ArrowBackIcon />
				</IconButton>
				<h1 className='text-4xl'>Settings</h1>

				<div className='flex ml-auto'>
					<ThemeSwitcher />
				</div>
			</div>

			<div className='flex flex-1 w-full p-4 gap-4'>
				{/* aside */}
				<Box className='flex flex-row min-w-[250px] rounded-xl'>
					<List className='w-full' disablePadding>
						{SETTINGS_ROUTES_LIST.map((route) => (
							<ListItemButton
								component={Link}
								to={route.path}
								selected={selected === route.id}
								sx={{ borderRadius: '200px' }}
								key={route.id}
							>
								{route.icon && (
									<ListItemIcon
										sx={{ minWidth: 0, mr: '16px' }}
									>
										<route.icon />
									</ListItemIcon>
								)}

								<ListItemText
									primary={route.name ?? route.id}
								/>
							</ListItemButton>
						))}
					</List>
				</Box>

				{/* content */}
				<div className='flex flex-col flex-1 gap-2 bg-surface-mid rounded-3xl'>
					<h2 className='text-3xl px-4 py-8 w-full align-center sticky top-0'>
						{selectedName}
					</h2>

					<div className='flex flex-col flex-1 gap-2 p-4'>
						{children}
					</div>
				</div>
			</div>
		</motion.div>
	);
}

export default SettingsSkeleton;
