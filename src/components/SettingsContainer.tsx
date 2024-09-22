import BackButton from "./BackButton";
import Title from "./Title";

function SettingsContainer({
    title,
    back,
    children,
}: { title: string; back?: boolean; children?: any }) {
    return (
        <div className="flex flex-col justify-start items-start gap-4">
            {title && <Title text={title} />}
            {(back === true || back === undefined) && <BackButton />}
            {children}
        </div>
    );
}

export default SettingsContainer;
