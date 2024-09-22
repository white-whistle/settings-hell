import BackButton from "../components/BackButton";
import Button from "../components/Button";
import CheckBox from "../components/CheckBox";
import FullScreenContainer from "../components/FullScreenContainer";
import Labeled from "../components/Labeled";
import SettingsContainer from "../components/SettingsContainer";
import { useGame } from "../ctx/GameStateProvider";

function WorldGenSettings() {
    const { gameState, modifyGameState } = useGame();

    return (
        <FullScreenContainer>
            <SettingsContainer title="World Gen">
                <Labeled label="Full scale">
                    <CheckBox
                        checked={gameState.worldGenSettings.fullScale}
                        onChange={(checked) =>
                            modifyGameState((gs) => (gs.worldGenSettings.fullScale = checked))
                        }
                    />
                </Labeled>
                <Labeled label="Gen Extensions">
                    <CheckBox
                        checked={gameState.worldGenSettings.genExtensions}
                        onChange={(checked) =>
                            modifyGameState(
                                (gs) => (gs.worldGenSettings.genExtensions = checked),
                            )
                        }
                    />
                </Labeled>
                <Labeled label="Peripherals">
                    <CheckBox
                        checked={gameState.worldGenSettings.peripherals}
                        onChange={(checked) =>
                            modifyGameState(
                                (gs) => (gs.worldGenSettings.peripherals = checked),
                            )
                        }
                    />
                </Labeled>
            </SettingsContainer>
        </FullScreenContainer>
    );
}

export default WorldGenSettings;
