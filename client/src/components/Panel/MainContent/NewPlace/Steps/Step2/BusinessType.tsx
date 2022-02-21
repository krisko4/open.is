import { Autocomplete, TextField } from "@mui/material"
import React, { useRef } from "react"
import { FC, useState, useEffect } from "react"
import { Controller, FieldValues, useFormContext, useWatch } from "react-hook-form"
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext"
import { CurrentPlaceProps } from "../../../../../../contexts/PlaceProps"
import { getBusinessTypes } from "../../../../../../requests/BusinessTypeRequests"

export const BusinessTypeContainer: FC = () => {
    const methods = useFormContext()
    const { currentPlace, setCurrentPlace } = useCurrentPlaceContext()
    return <BusinessType setCurrentPlace={setCurrentPlace} currentPlace={currentPlace} {...methods} />
}

interface Props {
    currentPlace: CurrentPlaceProps,
    setCurrentPlace: React.Dispatch<React.SetStateAction<CurrentPlaceProps>>
}

const BusinessType = React.memo<FieldValues & Props>(({ setValue, currentPlace, setCurrentPlace, control, formState: { errors } }) => {
    // const { control, formState: { errors } } = useFormContext()
    const [businessTypes, setBusinessTypes] = useState<any>([])
    // const { setCurrentPlace } = useCurrentPlaceContext()
    useEffect(() => {
        getBusinessTypes().then(res => setBusinessTypes(res.data))
            .catch(err => console.log(err))
    }, [])


    const type = useWatch({
        control,
        name: 'type'
    })
    
    const isFirstRender = useRef(true)

    useEffect(() => {
        if (isFirstRender.current) {
            setValue('type', currentPlace.type)
            isFirstRender.current = false
            return
        }
        setCurrentPlace(place => {
            place.type = type
            return { ...place }
        })
    }, [type])

    return (
        <Controller
            control={control}
            name="type"
            render={({ field: { onChange, value } }) =>
            (
                <Autocomplete
                    onChange={(e, value) => onChange(value)}
                    value={value}
                    options={businessTypes}
                    fullWidth={true}
                    renderInput={(params) => <TextField
                        placeholder="Select your business type"
                        error={errors.type?.message ? true : false}
                        helperText={errors.type?.message && <span style={{ color: 'red' }}>Please choose a correct business type</span>}
                        variant="outlined"
                        color="primary"
                        {...params}
                        label="Business type" />}
                />
            )

            }
        />
    )
},
    (prevProps, nextProps) => {
    return prevProps.getValues('type') === nextProps.getValues('type') && prevProps.formState === nextProps.formState
    }
)