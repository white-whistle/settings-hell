import { observer } from '@legendapp/state/react';
import { closeModal, modals$ } from '../hooks/useModal';
import { AnimatePresence } from 'framer-motion';

function ModalRenderer() {
	const modals = modals$.get();

	const topModalEntry = modals[0];

	return (
		<AnimatePresence>
			{topModalEntry && (
				<topModalEntry.comp
					{...topModalEntry.props}
					onClose={() => closeModal(topModalEntry)}
				/>
			)}
		</AnimatePresence>
	);
}

export default observer(ModalRenderer);
