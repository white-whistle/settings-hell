import { Accordion as MuiAccordion, AccordionProps } from "@mui/material";
import { Condition } from "../../core/Condition";
import { useCondition } from "../../hooks/useCondition";

function Accordion({
    condition,
    ...props
}: { condition: Condition } & AccordionProps) {
    const res = useCondition(condition);
    const disabled = !res.passed;
    return <MuiAccordion {...props} disabled={disabled} />;
}

export default Accordion;
