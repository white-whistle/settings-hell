import FullScreenContainer from "../components/FullScreenContainer";
import Labeled from "../components/Labeled";
import Select from "../components/Select";
import SettingsContainer from "../components/SettingsContainer";
import { useGame } from "../ctx/GameStateProvider";

function LocalizationSettings() {
    const { gameState, modifyGameState } = useGame();

    return (
        <FullScreenContainer>
            <SettingsContainer title="Localization">
                <Labeled label="Localization">
                    <Select
                        values={["", "US", "EU", "EA", "SA"]}
                        currentValue={gameState.localization.localization || ""}
                        onChange={(x) =>
                            modifyGameState((gs) => (gs.localization.localization = x))
                        }
                    />
                </Labeled>
                <Labeled label="Preferred Language">
                    <Select
                        values={["", "EN", "RU"]}
                        currentValue={gameState.localization.preferredLanguage || ""}
                        onChange={(x) =>
                            modifyGameState((gs) => (gs.localization.preferredLanguage = x))
                        }
                    />
                </Labeled>
            </SettingsContainer>
        </FullScreenContainer>
    );
}

export default LocalizationSettings;
