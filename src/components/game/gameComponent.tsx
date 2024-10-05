import React from 'react';
import { Condition, ConditionResult } from '../../core/Condition';
import { Paths } from '../../types';
import { GameState } from '../../hooks/GameState';
import useProperty, { ValueOrCallback } from '../../hooks/useProperty';
import { useCondition } from '../../hooks/useCondition';

type GameStatePath = Paths<GameState>;

export type GameComponentBaseProps<TPath extends GameStatePath> = {
	condition?: Condition;
	property?: TPath;
};

export default function gameComponent<
	TBase extends React.ComponentType,
	TUseProps extends (ctx: {
		result: ConditionResult;
		state: any;
		setState: (valueOrCallback: ValueOrCallback<any>) => void;
	}) => Partial<React.ComponentProps<TBase>>
>(Base: TBase, useProps: TUseProps) {
	type AddedProps = ReturnType<TUseProps>;

	type GameComponentProps<TPath extends GameStatePath> = Omit<
		React.ComponentProps<TBase>,
		keyof AddedProps
	> &
		GameComponentBaseProps<TPath>;

	return function GameComponent<TPath extends GameStatePath>({
		property,
		condition,
		...props
	}: GameComponentProps<TPath>) {
		const [state, setState] = useProperty(property ?? 'noprop');
		const result = useCondition(condition ?? Condition.Passed());

		const addedProps = useProps({ result, state, setState });

		// @ts-ignore
		return <Base {...props} {...addedProps} />;
	};
}
