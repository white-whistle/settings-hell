import { DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { BaseModalProps } from '../hooks/useModal';
import MotionDialog from '../components/MotionDialog';

function TosModal({ onClose }: BaseModalProps) {
	return (
		<MotionDialog onClose={onClose} open>
			<DialogTitle>Terms of Service</DialogTitle>
			<DialogContent>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit.
				Consectetur, esse!
			</DialogContent>
			<DialogActions></DialogActions>
		</MotionDialog>
	);
}

export default TosModal;
