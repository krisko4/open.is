import { TextField } from "@mui/material"
import { useFormikContext } from "formik"
import React, { useEffect, useState } from "react"
import { useCurrentPlaceContext } from "../../../../../../../contexts/PanelContexts/CurrentPlaceContext"

export const Subtitle = () => {
    const { currentPlace, setCurrentPlace } = useCurrentPlaceContext()
    const [subtitle, setSubtitle] = useState(currentPlace.subtitle)
    const { setFieldValue } = useFormikContext()
    const handleChange = (e: any) => {
        setSubtitle(e.target.value)
    }


    // useEffect(() => {
    //     setFieldValue('subtitle', subtitle)
    // }, [subtitle])

    return (
        <TextField
            // value={subtitle}
            name="subtitle"
            variant="outlined"
            // focused
            placeholder="Please enter a short subtitle"
            helperText={`${subtitle.length}/100`}
            // onChange={() => setFiel}
            label="Subtitle"
            fullWidth
            inputProps={{
                maxLength: 100
            }}
        />

    )
}