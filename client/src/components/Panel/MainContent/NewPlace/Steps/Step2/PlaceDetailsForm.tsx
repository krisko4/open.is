import { Button, Grid, TextField, Typography } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import { FastField, Form, Formik } from "formik"
import { FC, useEffect, useState } from "react"
import * as Yup from "yup"
import { usePanelContext } from "../../../../../../contexts/PanelContext"
import { useStepContext } from "../../../../../../contexts/StepContext"


const places: string[] = [
    'restaurant',
    'grocery store'
]
// const PlaceDetailsSchema = Yup.object().shape({
//     type: Yup.string().required(),
//     subtitle: Yup.string().required().max(50),
//     description: Yup.string().required().max(250)
// })

export const PlaceDetailsForm: FC = () => {


    const { setActiveStep } = useStepContext()
    const { currentPlace, setCurrentPlace } = usePanelContext()


    const [subtitle, setSubtitle] = useState(currentPlace.subtitle)
    const [description, setDescription] = useState(currentPlace.description)
    const [isDirty, setDirty] = useState(true)

    useEffect(() => {
        currentPlace.type && subtitle && description && subtitle.length < 51 && description.length < 251 ? setDirty(false) : setDirty(true)
    }, [subtitle, description, currentPlace.type])


    const submitAutocomplete = (value: string | null) => {
        const newCurrentPlace = { ...currentPlace }
        if (value) newCurrentPlace.type = value
        setCurrentPlace(newCurrentPlace)
    }

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            const newCurrentPlace = { ...currentPlace }
            newCurrentPlace.description = description
            setCurrentPlace(newCurrentPlace)
        }, 500)
        return () => clearTimeout(delaySearch)
    }, [description])

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            const newCurrentPlace = { ...currentPlace }
            newCurrentPlace.subtitle = subtitle
            setCurrentPlace(newCurrentPlace)
        }, 500)
        return () => clearTimeout(delaySearch)
    }, [subtitle])



    return (
        <Grid item container lg={12} justify="space-evenly">
            <Grid item lg={5} style={{ marginTop: 20 }}>
                <Typography>
                    What is the type of your business?
                </Typography>
            </Grid>
            <Grid item lg={5}>
                <Autocomplete
                    options={places}
                    fullWidth={true}
                    value={currentPlace.type}
                    onChange={(e, value) => submitAutocomplete(value)}
                    renderInput={(params) => <TextField  {...params} label="Business type" />}
                />
            </Grid>
            <Grid item lg={5} style={{ marginTop: 20 }}>
                <Typography>
                    Please enter a short subtitle
                </Typography>
            </Grid>
            <Grid item lg={5}>
                <TextField
                    onChange={(e) => setSubtitle(e.target.value)}
                    name="subtitle"
                    value={subtitle}
                    fullWidth={true}
                    label='Subtitle'
                    helperText={`${subtitle.length}/50`}
                    inputProps={{
                        maxLength: 50

                    }} />
            </Grid>
            <Grid item lg={10} style={{ marginTop: 20 }}>
                <Typography style={{ textAlign: 'center' }}>
                    How would you describe your business in few words?
                </Typography>
            </Grid>
            <Grid item lg={10} style={{ marginTop: 10 }}>
                <TextField
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth={true}
                    value={description}
                    label="This is a description of my place!"
                    multiline
                    name="description"
                    rows={10}
                    variant="outlined"
                    rowsMax={10}
                    helperText={`${description.length}/250`}
                    inputProps={{
                        maxLength: 250
                    }}
                />
            </Grid>
            <Grid item lg={10}>
                <Button
                    fullWidth={true}
                    variant="contained"
                    style={{ marginTop: 10 }}
                    color="primary"
                    type="submit"
                    disabled={isDirty}
                    onClick={() => setActiveStep(2)}
                >
                    Submit
                </Button>
            </Grid>
        </Grid>
      
    )
}