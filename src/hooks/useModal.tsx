import { observable } from '@legendapp/state';
import { ComponentProps, ComponentType } from 'react';

export type BaseModalProps = { onClose: () => void };
type ModalEntry = { comp: ComponentType<BaseModalProps>; props: any };

export const modals$ = observable<ModalEntry[]>([]);

export function addModal(entry: ModalEntry) {
	modals$.set((prev) => [...prev, entry]);
	return entry;
}

export function closeModal(entry: ModalEntry) {
	modals$.set((prev) => prev.filter((m) => m !== entry));
}

export function closeAllMModals() {
	modals$.set([]);
}

export default function useModal<
	TModal extends ComponentType<{ onClose: () => void }>
>(Modal: TModal) {
	function open<T extends {}>(): () => void;
	function open<T extends Omit<ComponentProps<TModal>, 'onClose'>>(
		props: T
	): () => void;
	function open<T>(props?: T) {
		const entry = addModal({
			comp: Modal,
			props,
		});

		return () => {
			closeModal(entry);
		};
	}

	return {
		open,
	};
}
