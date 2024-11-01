import { Condition } from "./Condition";
import * as constants from "./constants";

import {
    notEmpty,
    startsWithNumber,
    doesNotContainWhitespace,
    validEmail,
    bannedEmailDomain,
    minLength,
    containsCharacter,
} from "./conditoinHelpers.ts";

const usernameIncludes = (content: string) => {
    return Condition.from(
        (state) => state.user.username.includes(content),
        `Username must include "${content}"`,
    );
};

export default {
    general: {
        tos: {
            enabled: Condition.from(
                (state) => state.general.tos,
                "ToS must be enabled",
            ),
            disabled: Condition.from(
                (state) => state.general.tos,
                "ToS must be disabled",
            ),
        },
        antBuffer: {
            every: Condition.from(
                (state) => state.general.snake.every(Boolean),
                "All switches must be checked",
            ),
        },
    },
    user: {
        username: {
            valid: Condition.and(
                notEmpty("user.username"),
                startsWithNumber("user.username", { invert: true }),
                doesNotContainWhitespace("user.username"),
            ),
            password: Condition.and(
                minLength("user.email", 8),
                containsCharacter("user.email"),
                containsCharacter("user.email", { upper: true }),
            ),
            email: Condition.and(
                validEmail("user.email"),
                bannedEmailDomain("user.email", "Gmail"),
                bannedEmailDomain("user.email", "Yahoo"),
            ),
            agreesTos: usernameIncludes(constants.TOS_AGREE_STRING),
            confirmsTos: usernameIncludes(constants.TOS_CONFIRM_STRING),
        },
    },
};
