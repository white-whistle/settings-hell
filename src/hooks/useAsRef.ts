import { useRef } from "preact/hooks";

export default function useAsRef<T>(value: T) {
	const ref = useRef<T>(value);

	ref.current = value;

	return ref;
}