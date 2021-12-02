import { TextField } from "@material-ui/core"
import { useFormikContext } from "formik"
import React, { useEffect, useState } from "react"
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext"

export const Subtitle = () => {
    const {currentPlace, setCurrentPlace } = useCurrentPlaceContext()
    const [subtitle, setSubtitle] = useState(currentPlace.subtitle)
    const { setFieldValue } = useFormikContext()
    const handleChange = (e: any) => {
        setSubtitle(e.target.value)
    }


    useEffect(() => {
        const timeout = setTimeout(() => {
            setCurrentPlace(currentPlace => {
                currentPlace.subtitle = subtitle
                return { ...currentPlace }
            })
            setFieldValue('subtitle', subtitle)
        }, 50)
        return () => clearTimeout(timeout)
    }, [subtitle])

    return (
        <TextField
            value={subtitle}
            helperText={`${subtitle.length}/100`}
            onChange={handleChange}
            label="Subtitle"
            fullWidth
            inputProps={{
                maxLength: 100
            }}
        />

    )
}