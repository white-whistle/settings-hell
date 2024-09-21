import { useRouter } from "../router/RouterProvider";
import Button from "./Button";

function BackButton() {
    const { back } = useRouter();
    return <Button text="Back" onClick={back} />;
}

export default BackButton;
