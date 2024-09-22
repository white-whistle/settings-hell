import Group from "./Group";
import Label from "./Label";

function Labeled({ label, children }: { label?: string; children: any }) {
    return (
        <Group>
            <Label label={label} />
            {children}
        </Group>
    );
}

export default Labeled;
