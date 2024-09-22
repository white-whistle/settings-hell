function CheckBox({
    checked,
    onChange,
}: { checked?: boolean; onChange?: (checked: boolean) => void }) {
    return (
        <input
            type="checkbox"
            checked={checked}
            className="checkbox"
            onChange={onChange && (() => onChange(!checked))}
        />
    );
}

export default CheckBox;
