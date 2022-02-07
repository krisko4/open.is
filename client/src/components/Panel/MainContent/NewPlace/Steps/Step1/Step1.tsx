import { Fade, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import DoneIcon from "@mui/icons-material/Done";
import React, { FC, useEffect, useState } from "react";
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext";
import { useStepContext } from "../../../../../../contexts/StepContext";
import { LoadingButton } from "../../../../../reusable/LoadingButton";


const useStyles = makeStyles({
    input: {
        '& .MuiInputBase-root, .MuiFormHelperText-root': {
            color: 'white'
        },
        
    }
})

export const Step1: FC = () => {

    const { setCurrentStep, setActiveStep } = useStepContext()
    const { currentPlace, setCurrentPlace } = useCurrentPlaceContext()
    const [input, setInput] = useState('')
    const classes = useStyles()

    useEffect(() => {
        setCurrentStep(0)
    }, [])
    useEffect(() => {
        setInput(currentPlace.name)
    }, [currentPlace])


    const submitName = () => {
        setCurrentStep(1)
        setActiveStep(1)
        const newCurrentPlace = { ...currentPlace }
        newCurrentPlace.name = input
        setCurrentPlace(newCurrentPlace)
    }
    return (
        <Fade in={true} timeout={1500}>
            <Grid item container direction="column" justifyContent="space-between" style={{ textAlign: 'center' }}>

                <Typography style={{ color: 'white' }} variant="h2">What is the name of your business?</Typography>

                <TextField
                    style={{ marginTop: 10 }}
                    label="Business name"
                    fullWidth={true}
                    value={input}
                    className={classes.input}
                    color="primary"
                    placeholder="This is the name of my business!"
                    variant="outlined"
                    focused
                    onChange={(e) => setInput(e.target.value)}
                    helperText={`${input.length}/60`}
                    inputProps={{ maxLength: 60 }}
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
                    size="large"
                    disabled={!input}
                    fullWidth={true}
                    style={{ marginTop: 20, marginBottom: 20 }}
                    variant="contained"
                    color="primary"
                    onClick={() => submitName()}
                >
                    Submit
                </LoadingButton>
            </Grid >
        </Fade>
    );
}