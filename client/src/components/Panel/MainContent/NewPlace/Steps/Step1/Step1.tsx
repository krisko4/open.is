import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { NameInput } from "./NameInput";
import { LoadingButton } from "../../../../../LoadingButton/LoadingButton";
import { StepContext, useStepContext } from "../../../../../../contexts/StepContext";

interface Props {
    setActiveStep: React.Dispatch<React.SetStateAction<number>>
}
interface StepContextProps {
    placeName: string,
    setPlaceName: React.Dispatch<React.SetStateAction<string>>
}

export const Step1: FC<Props> = ({ setActiveStep }) => {

    const [isNameCorrect, setNameCorrect] = useState(false)
    const [isButtonLoading, setButtonLoading] = useState(false)
    const {placeName, setPlaceName} = useStepContext()
    

    const submitName = () => {
        setActiveStep(1)
        console.log(placeName)
    }
    return (
        <Grid item lg={9} style={{ textAlign: 'center' }}>
            <Typography variant="h3">Step 1</Typography>
            <Typography variant="subtitle1">What is the name of your business?</Typography>
            <NameInput isNameCorrect={isNameCorrect} placeName={placeName} setPlaceName={setPlaceName} setButtonLoading={setButtonLoading} setNameCorrect={setNameCorrect} />
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