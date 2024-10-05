import React from 'react';
import { Condition } from '../core/Condition';
import { useGameState } from './GameState';
import { useShallow } from 'zustand/react/shallow';

export function useConditionCheck() {
	return React.useCallback((conditions: Condition[]) => {
		return Condition.check(useGameState.getState(), conditions);
	}, []);
}

export function useCondition(...condition: Condition[]) {
	return useGameState(
		useShallow((gameState) => Condition.check(gameState, condition))
	);
}
