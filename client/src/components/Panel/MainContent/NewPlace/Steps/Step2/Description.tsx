import { TextField } from "@mui/material"
import React, { FC, useEffect, useRef } from "react"
import { FieldValues, useFormContext, useWatch } from "react-hook-form"
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext"
import { CurrentPlaceProps } from "../../../../../../contexts/PlaceProps"

export const DescriptionContainer: FC = () => {
    const methods = useFormContext()
    const { currentPlace, setCurrentPlace } = useCurrentPlaceContext()
    return <Description setCurrentPlace={setCurrentPlace} currentPlace={currentPlace} {...methods} />

}

interface Props {
    currentPlace: CurrentPlaceProps,
    setCurrentPlace: React.Dispatch<React.SetStateAction<CurrentPlaceProps>>
}

const Description = React.memo<FieldValues & Props>(({ currentPlace, setCurrentPlace, control, register, setValue, formState: {errors} }) => {
    const description = useWatch({
        control,
        name: 'description'
    })

    const isFirstRender = useRef(true)



    useEffect(() => {
        if(isFirstRender.current){
            setValue('description', currentPlace.description)
            isFirstRender.current = false
            return
        }
        setCurrentPlace(place => {
            place.description = description
            return { ...place }
        })
    }, [description])


    return (
        <TextField
            fullWidth={true}
            {...register('description')}
            label="This is a description of my business!"
            multiline
            name="description"
            rows={10}
            variant="outlined"
            placeholder="Describe your business in few words"
            error={errors.description?.message ? true : false}
            helperText={
                errors.description?.message ||
                `${description.length}/600`
            }
            inputProps={{
                maxLength: 600
            }}
        />
    )
}, (prevProps, nextProps) => {
    return prevProps.getValues('description') === nextProps.getValues('description') && prevProps.formState === nextProps.formState
})