import { Grid, TextField, Typography } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import { FC, useEffect, useRef, useState } from "react"
import myAxios from "../../../../../../axios/axios"
import { usePanelContext } from "../../../../../../contexts/PanelContext"
import { useStepContext } from "../../../../../../contexts/StepContext"
import { LoadingButton } from "../../../../../reusable/LoadingButton"

export const PlaceDetailsForm: FC = () => {


    const { setActiveStep } = useStepContext()
    const { currentPlace, setCurrentPlace } = usePanelContext()
    const [loading, setLoading] = useState(false)

    const [subtitle, setSubtitle] = useState(currentPlace.subtitle)
    const [description, setDescription] = useState(currentPlace.description)
    const [isDirty, setDirty] = useState(true)
    const [businessTypes, setBusinessTypes] = useState<any>([])
    const isFirstDescriptionRender = useRef(true)
    const isFirstSubtitleRender = useRef(true)

    useEffect(() => {
        myAxios.get('/business_types')
            .then(res => setBusinessTypes(res.data))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        currentPlace.type && subtitle && description && subtitle.length < 101 && description.length < 401 ? setDirty(false) : setDirty(true)
    }, [subtitle, description, currentPlace.type])


    const submitAutocomplete = (value: string | null) => {
        const newCurrentPlace = { ...currentPlace }
        if (value) newCurrentPlace.type = value
        setCurrentPlace(newCurrentPlace)
    }

    useEffect(() => {
        if (isFirstDescriptionRender.current) {
            isFirstDescriptionRender.current = false
            return
        }
        setLoading(true)
        const delaySearch = setTimeout(() => {
            const newCurrentPlace = { ...currentPlace }
            newCurrentPlace.description = description
            setCurrentPlace(newCurrentPlace)
            setLoading(false)
        }, 500)
        return () => clearTimeout(delaySearch)
    }, [description])

    useEffect(() => {
        if (isFirstSubtitleRender.current) {
            isFirstSubtitleRender.current = false
            return
        }
        setLoading(true)
        const delaySearch = setTimeout(() => {
            const newCurrentPlace = { ...currentPlace }
            newCurrentPlace.subtitle = subtitle
            setCurrentPlace(newCurrentPlace)
            setLoading(false)
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
                    options={businessTypes}
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
                    helperText={`${subtitle.length}/100`}
                    inputProps={{
                        maxLength: 100

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
                    helperText={`${description.length}/400`}
                    inputProps={{
                        maxLength: 400
                    }}
                />
            </Grid>
            <Grid item lg={10}>
                <LoadingButton
                    loading={loading}
                    fullWidth={true}
                    variant="contained"
                    style={{ marginTop: 10 }}
                    color="primary"
                    type="submit"
                    disabled={isDirty || loading}
                    onClick={() => setActiveStep(2)}
                >
                    Submit
                </LoadingButton>
            </Grid>
        </Grid>

    )
}