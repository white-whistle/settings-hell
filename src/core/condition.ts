import { GameState } from ".";

export type Condition =
    | boolean
    | string
    | ((gameContext: GameState) => Condition);

export function evaluateCondtion(
    condition: Condition,
    gameState: GameState,
): boolean | string {
    if (condition === undefined) console.log("error: condition is undefined");
    if (typeof condition === "boolean" || typeof condition === "string")
        return condition;
    return evaluateCondtion(condition(gameState), gameState);
}

export function conditionArray(...conditions: Condition[]): Condition {
    return (gameState: GameState) => {
        for (const cond of conditions) {
            const res = evaluateCondtion(cond, gameState);
            if (res !== true) return res;
        }
        return true;
    };
}

export function conditionObject(obj: Record<string, Condition>): Condition {
    return (gameState: GameState) => {
        for (const [_key, value] of Object.entries(obj)) {
            const res = evaluateCondtion(value, gameState);
            if (res !== true) return res;
        }
        return true;
    };
}

export function customMessage(
    cond: Condition,
    message: string | ((previousMessage: string) => string),
): Condition {
    return (gameState: GameState) => {
        const res = evaluateCondtion(cond, gameState);
        if (res !== true) {
            if (typeof message === "string") return message;
            if (res === false) return false;
            return message(res);
        }
        return true;
    };
}

export function exactMatch(
    name: string,
    target: string | boolean | undefined,
    extract: (gameState: GameState) => string | boolean | undefined,
): Condition {
    return (gameState: GameState) => {
        const value = extract(gameState);
        if (value !== target)
            return `Invalid value for\`${name}\`, expected: \`${target}\`.`;
        return true;
    };
}

export function notEmpty(
    name: string,
    extract: (gameState: GameState) => string | any[] | undefined,
): Condition {
    return (gameState: GameState) => {
        const value = extract(gameState);
        if (value === undefined) return `\`${name}\` cannot be empty.`;

        const pass = value.length !== 0;
        if (!pass) return `\`${name}\` cannot be empty.`;

        return true;
    };
}

export function oneOf(
    name: string,
    extract: (gameState: GameState) => string | number | undefined,
    values: (string | number)[],
    longMessage?: boolean,
): Condition {
    return (gameState: GameState) => {
        const value = extract(gameState);
        if (values.find((x) => x == value) !== undefined) return true;
        if (longMessage)
            return `\`${name}\` must be one of \`${values.map((x) => `${x}`).join(", ")}\`.`;
        return `\`${name}\` has an invalid value.`;
    };
}