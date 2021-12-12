import { TextField } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import { useFormikContext } from "formik"
import { useEffect, useState } from "react"
import myAxios from "../../../../../../../axios/axios"
import { useCurrentPlaceContext } from "../../../../../../../contexts/PanelContexts/CurrentPlaceContext"

export const BusinessType = () => {

    const [businessTypes, setBusinessTypes] = useState<any>([])
    const { currentPlace, setCurrentPlace } = useCurrentPlaceContext()
    const [type, setType] = useState<string | null>(currentPlace.type)
    const {setFieldValue} = useFormikContext()

    useEffect(() => {
        myAxios.get('/business_types')
            .then(res => setBusinessTypes(res.data))
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
            options={businessTypes}
            fullWidth={true}
            value={type}
            onChange={(e, value) => submitAutocomplete(value)}
            renderInput={(params) => <TextField  {...params} label="Business type" />}
        />

    )
}