import { TextField } from "@mui/material"
import React, { useRef } from "react"
import { FC, useEffect } from "react"
import { FieldValues, useFormContext, useWatch } from "react-hook-form"
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext"
import { CurrentPlaceProps } from "../../../../../../contexts/PlaceProps"

export const SubtitleContainer: FC = () => {
    const methods = useFormContext()
    const { currentPlace, setCurrentPlace } = useCurrentPlaceContext()
    return <Subtitle setCurrentPlace={setCurrentPlace} currentPlace={currentPlace} {...methods} />
}

interface Props {
    currentPlace: CurrentPlaceProps,
    setCurrentPlace: React.Dispatch<React.SetStateAction<CurrentPlaceProps>>
}

const Subtitle = React.memo<FieldValues & Props>(({ currentPlace, setCurrentPlace, control, formState:{errors, isValid}, setValue, register }) => {
    const subtitle = useWatch({
        control,
        name: 'subtitle'
    })

    const isFirstRender = useRef(true)
    
    useEffect(() => {
        if (isFirstRender.current) {
            setValue('subtitle', currentPlace.subtitle)
            isFirstRender.current = false
            return
        }
        setCurrentPlace(place => {
            place.subtitle = subtitle
            return { ...place }
        })
    }, [subtitle])
    return (
        <TextField
            {...register('subtitle')}
            variant="outlined"
            placeholder="Please enter a short subtitle"
            color="secondary"
            helperText={
                errors.subtitle?.message ||
                `${subtitle.length}/100`
            }
            error={errors.subtitle?.message ? true : false}
            label="Subtitle"
            fullWidth
            inputProps={{
                maxLength: 100
            }}
        />
    )
}, (prevProps, nextProps) => {
    return prevProps.getValues('subtitle') === nextProps.getValues('subtitle') && prevProps.formState === nextProps.formState
})