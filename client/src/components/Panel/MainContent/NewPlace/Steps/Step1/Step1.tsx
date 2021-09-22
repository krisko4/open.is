import { Grid, InputAdornment, TextField, Typography } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import React, { FC, useEffect, useState } from "react";
import { usePanelContext } from "../../../../../../contexts/PanelContext";
import { useStepContext } from "../../../../../../contexts/StepContext";
import { LoadingButton } from "../../../../../reusable/LoadingButton";




export const Step1: FC = () => {

    const { setActiveStep } = useStepContext()
    const {currentPlace, setCurrentPlace} = usePanelContext()
    const [input, setInput] = useState('')

    useEffect(() => {
        setInput(currentPlace.name)
    }, [currentPlace])


    const submitName = () => {
        setActiveStep(1)
        const newCurrentPlace = {...currentPlace}
        newCurrentPlace.name = input
        setCurrentPlace(newCurrentPlace)

    }
    return (
        <Grid item lg={9} style={{ textAlign: 'center' }}>
            <Typography variant="h3">Step 1</Typography>
            <Typography variant="subtitle1">What is the name of your business?</Typography>
            <TextField
                style={{ marginTop: 10 }}
                label="Enter the name of your place"
                fullWidth={true}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                InputProps={{
                    endAdornment:
                        <div>
                            {input &&
                                <InputAdornment position="end">
                                    <DoneIcon style={{ color: '#32de84' }} />
                                </InputAdornment>
                            }
                        </div>
                }}
            >
            </TextField>
            <LoadingButton
                disabled={!input}
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