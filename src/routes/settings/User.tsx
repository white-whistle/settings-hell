import GameTextField from "../../components/game/TextField";
import SettingsSkeleton from "../../components/SettingsSkeleton";
import Vertical from "../../components/Vertical";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { G } from "../../components/game";
import { AccordionDetails, AccordionSummary } from "@mui/material";
import { Condition } from "../../core/Condition";
import { ComponentProps } from "react";
import { useCondition } from "../../hooks/useCondition";
import conditions from "../../core/conditions";

function TextField({
    valid,
    ...props
}: { valid?: Condition } & ComponentProps<typeof GameTextField>) {
    const res = useCondition(valid || Condition.Passed());
    return (
        <GameTextField
            {...props}
            error={Boolean(res.errorMessage)}
            helperText={res.errorMessage}
        />
    );
}

// const advancedCondition = Condition.Failed("Not yet implemented");
const advancedCondition = Condition.Passed();

function User() {
    return (
        <SettingsSkeleton>
            <Vertical className="gap-4 items-start">
                <Vertical className="gap-4">
                    <TextField
                        property="user.username"
                        label="Username"
                        required
                        valid={conditions.user.username.valid}
                    />
                    <TextField
                        property="user.password"
                        label="Password"
                        type="password"
                        required
                    // valid={conditions.user.password}
                    />
                    <TextField
                        property="user.email"
                        label="Email"
                        type="email"
                        required
                    />
                    <TextField property="user.age" label="Age" type="number" />
                    <TextField property="user.jobTitle" label="Job title" />
                    <G.Accordion condition={advancedCondition}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="user-advanced"
                            id="user-advanced"
                        >
                            Advanced
                        </AccordionSummary>
                        <AccordionDetails>
                            <Vertical className="gap-4">
                                <TextField
                                    property="user.advanced.race"
                                    label="Age"
                                    type="number"
                                />
                                <TextField
                                    property="user.advanced.weightKg"
                                    label="Weight (kg)"
                                    type="number"
                                />
                                <TextField
                                    property="user.advanced.heightCm"
                                    label="Height (cm)"
                                    type="number"
                                />
                                <TextField
                                    property="user.advanced.numFingersOnHand"
                                    label="Number of fingers (on each hand)"
                                    type="number"
                                />
                            </Vertical>
                        </AccordionDetails>
                        {/* <AccordionActions> */}
                        {/*     <Button>Cancel</Button> */}
                        {/*     <Button>Agree</Button> */}
                        {/* </AccordionActions> */}
                    </G.Accordion>
                </Vertical>
            </Vertical>
        </SettingsSkeleton>
    );
}

export default User;
