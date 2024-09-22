import Button from "../components/Button";
import FullScreenContainer from "../components/FullScreenContainer";
import Group from "../components/Group";
import InputField from "../components/InputField";
import ThemeController from "../components/ThemeController";
import Title from "../components/Title";
import BackButton from "../components/BackButton";
import SettingsContainer from "../components/SettingsContainer";

function Settings() {
    return (
        <FullScreenContainer>
            <SettingsContainer title="Settings">
                <Group>
                    <div>Use dark mode: </div>
                    <ThemeController />
                </Group>
                <Button text="Localization Settings" onClick={"/localization"} />
                <Button text="World Gen Settings" onClick={"/world-gen-settings"} />
            </SettingsContainer>
        </FullScreenContainer>
    );
}

export default Settings;
