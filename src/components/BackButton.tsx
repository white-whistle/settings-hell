import Button from "./Button";

function BackButton() {
    return <Button text="Back" onClick={() => window.history.back()} />;
}

export default BackButton;
