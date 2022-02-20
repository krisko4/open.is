import { TextField } from "@mui/material"
import React from "react"
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

const Subtitle = React.memo<FieldValues & Props>(({setCurrentPlace, control, register}) => {
    const subtitle = useWatch({
        control,
        name: 'subtitle'
    })
    useEffect(() => {
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
            helperText={`${subtitle.length}/100`}
            label="Subtitle"
            fullWidth
            inputProps={{
                maxLength: 100
            }}
        />
    )
}, (prevProps, nextProps) => {
    return prevProps.getValues('subtitle') === nextProps.getValues('subtitle') 
})