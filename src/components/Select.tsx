function Select({
    values,
    currentValue,
    onChange,
}: {
    values: ({ value: string; display?: string; disabled?: boolean } | string)[];
    currentValue: string;
    onChange?: (value: string) => void;
}) {
    function handleOnChange(value: string) {
        if (
            values.find((v) =>
                typeof v === "string" ? v === value : v.value === value,
            ) !== undefined
        )
            if (onChange !== undefined) onChange(value);
    }

    return (
        <select
            className="select w-full max-w-xs"
            onChange={(e) =>
                handleOnChange(
                    //@ts-ignore
                    e.target.value,
                )
            }
        >
            {values.map((value) =>
                typeof value === "string" ? (
                    <option value={value} selected={value === currentValue}>
                        {value}
                    </option>
                ) : (
                    <option
                        value={value.value}
                        disabled={value.disabled}
                        selected={value.value === currentValue}
                    >
                        {value.display || value}
                    </option>
                ),
            )}
        </select>
    );
}

export default Select;
