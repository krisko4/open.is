import React, {FC, useEffect, useRef, useState} from "react";
import { Grid,  Typography} from "@material-ui/core";
import {NameInput} from "./NameInput";
import {LoadingButton} from "../../../../../LoadingButton/LoadingButton";

interface Props{
    setActiveStep :  React.Dispatch<React.SetStateAction<number>>
}

export const Step1: FC<Props> = ({setActiveStep}) => {

    const [isNameCorrect, setNameCorrect] = useState(false)
    const [isButtonLoading, setButtonLoading] = useState(false)



    return (
        <Grid item lg={9} style={{textAlign: 'center'}}>
            <Typography variant="h3">Step 1</Typography>
            <Typography variant="subtitle1">What is the name of your business?</Typography>
            <NameInput isNameCorrect={isNameCorrect} setButtonLoading={setButtonLoading} setNameCorrect={setNameCorrect} />
            <LoadingButton
                loading={isButtonLoading}
                disabled={!isNameCorrect}
                fullWidth={true}
                style={{marginTop: 20, marginBottom: 20}}
                variant="contained"
                color="primary"
                onClick={() => setActiveStep(1)}
            >
                Submit
            </LoadingButton>
        </Grid>

    )
}