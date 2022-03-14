import { Fade, Grid } from "@mui/material";
import React, { FC } from "react";
import { useStepContext } from "../../../../../../contexts/StepContext";
import { AddressDetails } from "./AddressDetails";




interface Props {
    isEditionMode: boolean
}

export const Step4: FC<Props> = ({ isEditionMode }) => {

    const { setActiveStep } = useStepContext()

    return (
        <Fade in={true} timeout={1500}>
            <Grid container justifyContent="center">
                    <AddressDetails isEditionMode={isEditionMode} setActiveStep={setActiveStep} />
            </Grid>
        </Fade>
    );
}