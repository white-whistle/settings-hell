import SettingsSkeleton from '../../components/SettingsSkeleton';
import Vertical from '../../components/Vertical';
import {
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Paper,
	Typography,
} from '@mui/material';
import { updateGameState, useGameState } from '../../hooks/GameState';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';

function License() {
	const generalTos = useGameState((state) => state.general.tos);
	return (
		<SettingsSkeleton>
			<Vertical className='gap-4 items-start'>
				<Vertical>
					<Typography>ToS Manager</Typography>
					<List>
						{generalTos && (
							<Paper variant='outlined'>
								<ListItem sx={{ gap: '16px' }}>
									<ListItemIcon sx={{ minWidth: 0 }}>
										<BadgeOutlinedIcon />
									</ListItemIcon>
									<ListItemText primary='General' />
									<IconButton
										onClick={() =>
											updateGameState((draft) => {
												draft.general.tos = false;
											})
										}
									>
										<DeleteOutlineOutlinedIcon />
									</IconButton>
								</ListItem>
							</Paper>
						)}
					</List>
				</Vertical>
			</Vertical>
		</SettingsSkeleton>
	);
}

export default License;
