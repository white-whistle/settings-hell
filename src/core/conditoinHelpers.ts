import { GameState } from "../hooks/GameState";
import { Paths } from "../types";
import { Condition } from "./Condition";
import { get } from "radash";
import { parseOneAddress } from "email-addresses";

function getLastPropField<TPath extends Paths<GameState>>(
    property: TPath,
): string {
    const arr = property.split(".");
    const lastIdx = arr.length - 1;
    return arr[lastIdx] || "";
}

type Opts = Partial<{
    displayName: string;
}>;

function getDisplayName<TPath extends Paths<GameState>>(
    property: TPath,
    opts?: Opts,
) {
    return opts?.displayName || getLastPropField(property);
}

export function notEmpty<TPath extends Paths<GameState>>(
    property: TPath,
    opts?: Opts,
) {
    const name = getDisplayName(property, opts);
    return Condition.from((state) => {
        const val = get(state, property);
        return Boolean(val);
    }, `${name} cannot be empty.`);
}

export function minLength<TPath extends Paths<GameState>>(
    property: TPath,
    length: number,
    opts?: Opts,
) {
    const name = getDisplayName(property, opts);
    return Condition.from((state) => {
        const val = get(state, property);
        if (typeof val === "string") {
            return val.length >= length;
        }
        if (typeof val === "object" && val && "length" in val) {
            const valL = val.length;
            if (typeof valL === "number") return valL >= length;
        }
        return false;
    }, `${name} must of a length of at least ${length}.`);
}

export function startsWith<TPath extends Paths<GameState>>(
    property: TPath,
    searchString: string,
    opts?: Opts & { position?: number },
) {
    const name = getDisplayName(property, opts);
    const msgEnd = opts?.position ? " ${position}." : ".";

    return Condition.from((state) => {
        const val = get(state, property);
        if (typeof val === "string")
            return val.startsWith(searchString, opts?.position);
        return false;
    }, `${name} must start with '${startsWith}'${msgEnd}`);
}

export function matchesRe<TPath extends Paths<GameState>>(
    property: TPath,
    re: RegExp,
    cause: string,
    opts?: Opts & {
        invert?: boolean;
        invertCause?: string;
        matchesStart?: boolean;
    },
) {
    const name = getDisplayName(property, opts);

    const errMsg = opts?.invert
        ? opts?.invertCause
            ? `${name} ${opts.invertCause}`
            : `Condition not satisfied: ${name} ${cause}`
        : `${name} ${cause}`;

    return Condition.from((state) => {
        const val = get(state, property);

        let passed = false;
        if (typeof val === "string") {
            if (opts?.matchesStart) {
                const m = val.match(re);
                passed = m !== null && m.index === 0;
            } else {
                passed = re.test(val);
            }
        }

        if (opts?.invert) return !passed;
        return passed;
    }, errMsg);
}

export function containsCharacter<TPath extends Paths<GameState>>(
    property: TPath,
    opts?: Opts & { invert?: boolean; upper?: boolean },
) {
    if (opts?.upper) {
        return matchesRe(
            property,
            /[A-A]/,
            "does not contain an upper case character.",
            {
                ...opts,
                invertCause: "contains an upper case character",
            },
        );
    }

    return matchesRe(property, /[a-z]/, "does not contain a character.", {
        ...opts,
        invertCause: "contains a character",
    });
}

export function startsWithCharacter<TPath extends Paths<GameState>>(
    property: TPath,
    opts?: Opts & { invert?: boolean },
) {
    return matchesRe(property, /^[a-zA-Z]/, "does not start with a character.", {
        ...opts,
        invertCause: "starts with a character",
    });
}

export function startsWithNumber<TPath extends Paths<GameState>>(
    property: TPath,
    opts?: Opts & { invert?: boolean },
) {
    return matchesRe(property, /^[0-9]/, "does not start with a number.", {
        ...opts,
        invertCause: "starts with a number",
    });
}

export function doesNotContainWhitespace<TPath extends Paths<GameState>>(
    property: TPath,
    opts?: Opts,
) {
    const name = getDisplayName(property, opts);
    const errMsg = `${name} must not contain whitespace`;

    return Condition.from((state) => {
        const val = get(state, property);
        if (typeof val === "string") {
            for (const item of [" ", "\t", "\n", "\n\r"]) {
                if (val.indexOf(item) !== -1) {
                    return false;
                }
            }
        }
        return true;
    }, errMsg);
}

export function doesNotContain<TPath extends Paths<GameState>>(
    property: TPath,
    s: string | string[],
    opts?: Opts & { invert?: boolean },
) {
    const name = getDisplayName(property, opts);

    const errMsg =
        typeof s === "string"
            ? `${name} must not contain '${s}'`
            : `${name} must not contain any of '${s.join(", ")}'`;

    return Condition.from((state) => {
        const val = get(state, property);
        if (typeof val === "string") {
            if (typeof s == "string") {
                return val.indexOf(s) === -1;
            } else {
                for (const item of s) {
                    if (val.indexOf(item) !== -1) {
                        return false;
                    }
                }
            }
        }
        return false;
    }, errMsg);
}

export function validEmail<TPath extends Paths<GameState>>(
    property: TPath,
    opts?: Opts,
) {
    const name = getDisplayName(property, opts);

    return Condition.from((state) => {
        const val = get(state, property);
        if (typeof val === "string") {
            const email = parseOneAddress(val);
            if (email) {
                if ("local" in email) {
                    return true;
                }
            }
        }
        return false;
    }, `${name} must be a valid email '${startsWith}'`);
}

export function bannedEmailDomain<TPath extends Paths<GameState>>(
    property: TPath,
    domain: string,
) {
    return Condition.from((state) => {
        const val = get(state, property);
        if (typeof val === "string") {
            const email = parseOneAddress(val);
            if (email) {
                if ("domain" in email) {
                    if (email.domain.toLowerCase().startsWith(domain)) return false;
                }
            }
        }
        return true;
    }, `${domain} is not allowed`);
}
