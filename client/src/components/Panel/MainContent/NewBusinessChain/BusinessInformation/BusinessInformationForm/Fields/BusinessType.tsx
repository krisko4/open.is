import { FormControl, TextField } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { Autocomplete } from '@mui/material';
import { useFormikContext } from "formik"
import { useEffect, useState } from "react"
import { useCurrentPlaceContext } from "../../../../../../../contexts/PanelContexts/CurrentPlaceContext"
import { getBusinessTypes } from "../../../../../../../requests/BusinessTypeRequests"

const useStyles = makeStyles({
    clearIndicator: {
        color: 'red'
    },
    paper: {
        color: 'white',
        background: '#18202b'
    }
})

export const BusinessType = () => {

    const [businessTypes, setBusinessTypes] = useState<any>([])
    const { currentPlace, setCurrentPlace } = useCurrentPlaceContext()
    const [type, setType] = useState<string | null>(currentPlace.type)
    const { setFieldValue } = useFormikContext()
    const [firstAttempt, setFirstAttempt] = useState(true)
    const classes = useStyles()

    useEffect(() => {
        getBusinessTypes().then(res => setBusinessTypes(res.data))
            .catch(err => console.log(err))
    }, [])

    const submitAutocomplete = (value: string | null) => {
        setFirstAttempt(false)
        const newCurrentPlace = { ...currentPlace }
        if (value) newCurrentPlace.type = value
        setCurrentPlace(newCurrentPlace)
        setFieldValue('businessType', value)
        setType(value)
    }


    return (
            <Autocomplete
                freeSolo
                classes={classes}
                options={businessTypes}
                fullWidth={true}
                value={type}
                onChange={(e, value) => submitAutocomplete(value)}
                renderInput={(params) => <TextField
                    placeholder="Select your business type"
                    error={!firstAttempt && type === null}
                    helperText={!firstAttempt && type === null && <span style={{ color: 'red' }}>Please choose a correct business type</span>}
                    variant="outlined"
                    color="primary"
                    focused {...params}
                    label="Business type" />}
            />
    )
}