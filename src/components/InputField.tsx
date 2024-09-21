function InputField({
    title,
    onChange,
    changeAllowed,
}: {
    title: string;
    onChange?: (text: string) => void;
    changeAllowed?: (text: string) => void;
}) {
    return (
        <div className="p-2">
            {title && <p className="text-gray-100 text-2xl font-bold">{title}</p>}
            <input
                type="text"
                class={
                    "text-gray-100 text-xl font-bold border-b-2 bg-transparent border-gray-700 focus:bg-gray-800 focus:outline-none p-1"
                }
            />
        </div>
    );
}

export default InputField;
