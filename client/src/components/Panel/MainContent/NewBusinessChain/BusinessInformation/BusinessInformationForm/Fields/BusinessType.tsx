import { makeStyles, TextField } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import { useFormikContext } from "formik"
import { useEffect, useState } from "react"
import { useCurrentPlaceContext } from "../../../../../../../contexts/PanelContexts/CurrentPlaceContext"
import { getBusinessTypes } from "../../../../../../../requests/BusinessTypeRequests"

const useStyles = makeStyles({
    clearIndicator: {
        color: 'red'
    },
    paper:{
        color: 'white',
        background: '#18202b'
    }
})

export const BusinessType = () => {

    const [businessTypes, setBusinessTypes] = useState<any>([])
    const { currentPlace, setCurrentPlace } = useCurrentPlaceContext()
    const [type, setType] = useState<string | null>(currentPlace.type)
    const { setFieldValue } = useFormikContext()
    const classes = useStyles()

    useEffect(() => {
        getBusinessTypes().then(res => setBusinessTypes(res.data))
            .catch(err => console.log(err))
    }, [])

    const submitAutocomplete = (value: string | null) => {
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
            renderInput={(params) => <TextField placeholder="Select your business type"  variant="outlined" color="primary" focused {...params} label="Business type" />}
        />

    )
}