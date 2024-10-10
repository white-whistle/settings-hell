import { GameState } from "../hooks/GameState";

export type ConditionResult = {
	passed: boolean,
	errorMessage?: string,
};
export type Condition = (state: GameState) => ConditionResult;

export function Condition(c: Condition) {
	return c;
}

Condition.Const = (data: ConditionResult) => Condition(() => data);

const PASSED_DATA: ConditionResult = { passed: true };

Condition.Result = {
	Passed: (): ConditionResult => PASSED_DATA,
	Failed: (error?: string): ConditionResult => ({ passed: false, errorMessage: error }),
	from: (v: any, message?: string) => {
		if (v) {
			return Condition.Result.Passed();
		}

		return Condition.Result.Failed(message);
	},
	single(...res: ConditionResult[]) {
		return res.find(r => !r.passed) ?? Condition.Result.Passed();
	}
}

Condition.Passed = () => Condition.Const(Condition.Result.Passed());

Condition.Failed = (error?: string) => Condition.Const(Condition.Result.Failed(error));

Condition.check = (gameState: GameState, conditions: Condition[]) => {
	return Condition.Result.single(...conditions.map(c => c(gameState)))
}

Condition.and = (...conditions: Condition[]) => {
	return Condition(gameState => Condition.check(gameState, conditions))
}

Condition.from = (predicate: (gameState: GameState) => boolean, errorMessage: string) => {
	return Condition((state) => Condition.Result.from(predicate(state), errorMessage))
}

Condition.builder = (getter: (gameState: GameState) => any) => {
	return {
		enabled(name: string) {
			return Condition((state) => Condition.Result.from(getter(state) === true, `${name} must be enabled!`))
		},
		disabled(name: string) {
			return Condition((state) => Condition.Result.from(getter(state) === false, `${name} must be disabled!`))
		}
	}
}