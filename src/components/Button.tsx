import clsx from "clsx";

function Button({
    text,
    onClick,
    disabled,
}: { text: string; onClick?: () => void; disabled?: boolean }) {
    return (
        <button
            className={clsx(
                "text-2xl text-slate-200 bg-slate-600 border-2 border-black rounded-md p-4 font-bold",
                disabled && "text-slate-300 cursor-not-allowed",
                !disabled &&
                "hover:text-slate-100 hover:bg-slate-700 hover:scale-105 transition-all duration-100 ",
            )}
            style={
                disabled
                    ? {
                        // https://css-tricks.com/stripes-css/
                        background: `repeating-linear-gradient(45deg, #606dbc, #606dbc 10px, #465298 10px, #465298 20px)`,
                    }
                    : {}
            }
            onClick={onClick}
        >
            {text}
        </button>
    );
}

export default Button;
