
import { TextField } from "@material-ui/core"
import { useFormikContext } from "formik"
import React, { useEffect, useState } from "react"
import { useCurrentPlaceContext } from "../../../../../../../contexts/PanelContexts/CurrentPlaceContext"

export const Description = () => {
    const { values, setFieldValue } = useFormikContext()
    const {currentPlace, setCurrentPlace} = useCurrentPlaceContext()
    const [description, setDescription] = useState(currentPlace.description)
    const handleChange = (e: any) => {
        setDescription(e.target.value)
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCurrentPlace(currentPlace => {
                currentPlace.description = description 
                return {...currentPlace}
            })
            setFieldValue('description', description)
        }, 50)
        return () => clearTimeout(timeout)
    }, [description])

    return (
        <TextField
            fullWidth={true}
            label="This is a description of my business!"
            multiline
            value={description}
            onChange= {handleChange}
            name="description"
            rows={10}
            variant="outlined"
            rowsMax={10}
            helperText={`${description.length}/600`}
            inputProps={{
                maxLength: 600
            }}
        />

    )
}