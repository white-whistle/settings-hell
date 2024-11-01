import { createContext } from "@sgty/kontext-react";
import type { ValueOrCallback } from "../../../hooks/useProperty";

export const LivingContext = createContext(
	({
		isDead,
		setIsDead,
	}: {
		isDead: boolean;
		setIsDead: (v: ValueOrCallback<boolean>) => void;
	}) => ({
		isDead,
		setIsDead,
	}),
);
