import { Grid, Typography } from "@material-ui/core";
import React, { FC, useEffect, useState } from "react";
import { clearPlace, usePanelContext } from "../../../../../../contexts/PanelContext";
import { useStepContext } from "../../../../../../contexts/StepContext";
import { LoadingButton } from "../../../../../reusable/LoadingButton";
import { NameInput } from "./NameInput";





export const Step1: FC = () => {

    const [isNameCorrect, setNameCorrect] = useState(false)
    const [isButtonLoading, setButtonLoading] = useState(false)
    const { setActiveStep } = useStepContext()
  

    useEffect(() => {
        console.log('elo')
    }, [])

    const submitName = () => {
        setActiveStep(1)
    }
    return (
        <Grid item lg={9} style={{ textAlign: 'center' }}>
            <Typography variant="h3">Step 1</Typography>
            <Typography variant="subtitle1">What is the name of your business?</Typography>
            <NameInput isNameCorrect={isNameCorrect} setButtonLoading={setButtonLoading} setNameCorrect={setNameCorrect} />
            <LoadingButton
                loading={isButtonLoading}
                disabled={!isNameCorrect}
                fullWidth={true}
                style={{ marginTop: 20, marginBottom: 20 }}
                variant="contained"
                color="primary"
                onClick={() => submitName()}
            >
                Submit
            </LoadingButton>
        </Grid>

    )
}