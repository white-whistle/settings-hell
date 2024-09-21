import { implies } from "../utils";
import {
    conditionArray,
    conditionObject,
    customMessage,
    exactMatch,
    notEmpty,
    oneOf,
} from "./condition";

export type GameState = {
    user: {
        username?: string;
    };
    localization: {
        localization?: string;
        preferredLanguage?: string;
    };
    worldGenSettings: {
        fullScale: boolean;
        genExtensions: boolean;
        peripherals: boolean;
    };
};

export const DEFAULT_GAME_STATE: GameState = {
    user: {
        username: undefined,
    },
    localization: {
        localization: undefined,
        preferredLanguage: undefined,
    },
    worldGenSettings: {
        fullScale: false,
        genExtensions: false,
        peripherals: false,
    },
};

const ca = conditionArray;
const co = conditionObject;
const ne = notEmpty;
const of = oneOf;
const em = exactMatch;
const message = customMessage;

const user = {
    username: ne("Username", (gs) => gs.user.username),
};

const localization = {
    localization: of("Localization", (gs) => gs.localization.localization, [
        "US",
        "EU",
        "EA",
        "SA",
    ]),
    preferredLanguage: of(
        "Preferred Language",
        (gs) => gs.localization.localization,
        ["EN", "RU"],
    ),
};

const worldGenSettings = (gameState: GameState) => {
    const w = gameState.worldGenSettings;
    if (!((w.fullScale && w.genExtensions) || w.peripherals))
        return "Either `Full Scale` and `Gen Extensions` must be turned on, or `peripherals` must be turned on.";

    if (!implies(w.genExtensions, !w.peripherals))
        return "If `Gen genExtensions` are turned on, then `peripherals` must be turned off.";

    if (!(w.fullScale || w.peripherals))
        return "At least on of {`Full Scale`, `Gen Extensions`} must be turned on.";

    return true;
};

export const GAME_CONDITIONS = {
    play: ca(
        // Which is better, the object, or the custom messages?
        co(localization),
        // message(localization.localization, "Please configure localization."),
        // message(
        //     localization.preferredLanguage,
        //     "Please select your preferred uanguage.",
        // ),
        message(user.username, "Please set select a proper username."),
        message(
            worldGenSettings,
            "Please configure your world generation settings.",
        ),
    ),
    user,
    localization,
    worldGenSettings,
};
