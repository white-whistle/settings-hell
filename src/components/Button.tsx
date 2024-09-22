import clsx from "clsx";
import { Condition } from "../core/condition";
import { useGame } from "../ctx/GameStateProvider";
import { Link } from "wouter-preact";

export type ButtonVariant =
    | "neutral"
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning";

function ButtonInner({
    text,
    variant,
    disabled,
    onClick,
    tooltip,
}: {
    text: string;
    variant?: ButtonVariant;
    disabled?: boolean;
    onClick?: () => void;
    tooltip?: string;
}) {
    const btn = (
        <button
            onClick={onClick}
            className={clsx(
                "btn",
                variant && `btn-${variant}`,
                disabled && "btn-disabled",
                "text-xl",
            )}
        >
            {text}
        </button>
    );

    if (tooltip !== undefined)
        return (
            <div className="tooltip" data-tip={tooltip}>
                {btn}
            </div>
        );

    return btn;
}

function Button({
    text,
    onClick,
    condition,
}: {
    text: string;
    onClick?: "back" | (() => void) | string;
    condition?: Condition;
}) {
    const { evaluateCondtion } = useGame();
    const res = evaluateCondtion(condition);
    const disabled = res !== true;
    const tooltip = typeof res === "string" ? res : undefined;

    if (typeof onClick === "string")
        return (
            <Link to={onClick} disabled={disabled}>
                <ButtonInner text={text} disabled={disabled} tooltip={tooltip} />
            </Link>
        );

    return (
        <ButtonInner
            text={text}
            onClick={onClick}
            disabled={disabled}
            tooltip={tooltip}
        />
    );
}

export default Button;
