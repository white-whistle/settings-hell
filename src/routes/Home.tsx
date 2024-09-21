import Button from "../components/Button";
import Title from "../components/Title";
import { useRouter } from "../router/RouterProvider";

function Home() {
    const { navigateTo, currentRoute } = useRouter();
    console.log(currentRoute);

    return (
        <div className="flex flex-col justify-start items-start">
            <Title text="Main Menu" />
            <Button text="Play" disabled />
            <Button text="Settings" onClick={() => navigateTo("/settings")} />
            <Button text="About" onClick={console.log} />
        </div>
    );
}

export default Home;
