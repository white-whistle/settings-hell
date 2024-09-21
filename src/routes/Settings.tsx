import BackButton from "../components/BackButton";
import Button from "../components/Button";
import InputField from "../components/InputField";
import Title from "../components/Title";
import { useRouter } from "../router/RouterProvider";

function Settings() {
    const { currentRoute } = useRouter();
    console.log(currentRoute);

    return (
        <div className="flex flex-col justify-start items-start">
            <BackButton />
            <Title text="Settings" />
            <Button text="About" onClick={console.log} />
            <InputField title="Username" />
        </div>
    );
}

export default Settings;
