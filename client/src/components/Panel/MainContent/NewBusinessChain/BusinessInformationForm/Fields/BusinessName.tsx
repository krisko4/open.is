
import { TextField } from "@material-ui/core"
import { useFormikContext } from "formik"
import React, { useEffect, useState } from "react"
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext"

export const BusinessName = () => {
    const {currentPlace, setCurrentPlace} = useCurrentPlaceContext()
    const [businessName, setBusinessName] = useState(currentPlace.name)
    const {values, setFieldValue} = useFormikContext()
    const handleChange = (e : any) => {
        setBusinessName(e.target.value)
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCurrentPlace(currentPlace => {
                currentPlace.name = businessName
                return {...currentPlace}
            })
            setFieldValue('name', businessName)
        }, 50)
        return () => clearTimeout(timeout)
    }, [businessName])

    return (
        <TextField value={businessName} onChange={handleChange} label="Business name" fullWidth></TextField>
    )
}