import FullScreenContainer from "../components/FullScreenContainer";
import { GAME_CONDITIONS } from "../core";
import Button from "../components/Button";
import SettingsContainer from "../components/SettingsContainer";

function Home() {
    return (
        <FullScreenContainer>
            <SettingsContainer title="Main Menu" back={false}>
                <Button text="Play" condition={GAME_CONDITIONS.play} />
                <Button
                    text="Settings"
                    condition={GAME_CONDITIONS.settings}
                    onClick={"settings"}
                />
                <Button text="About" onClick={console.log} />
            </SettingsContainer>
        </FullScreenContainer>
    );
}

export default Home;
