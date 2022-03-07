
import MailIcon from '@mui/icons-material/Mail';
import { InputAdornment, TextField } from "@mui/material"
import React, { FC, useEffect, useRef } from "react"
import { FieldValues, useFormContext, useWatch } from "react-hook-form"
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext"
import { CurrentPlaceProps } from "../../../../../../contexts/PlaceProps"

export const EmailContainer: FC = () => {
    const methods = useFormContext()
    const { currentPlace, setCurrentPlace } = useCurrentPlaceContext()
    return <Email setCurrentPlace={setCurrentPlace} currentPlace={currentPlace} {...methods} />

}

interface Props {
    currentPlace: CurrentPlaceProps,
    setCurrentPlace: React.Dispatch<React.SetStateAction<CurrentPlaceProps>>
}

const Email = React.memo<FieldValues & Props>(({ currentPlace, setCurrentPlace, control, register, setValue, formState: { errors } }) => {
    const email = useWatch({
        control,
        name: 'email'
    })

    const isFirstRender = useRef(true)

    useEffect(() => {
        if (isFirstRender.current) {
            setValue('email', currentPlace.email)
            isFirstRender.current = false
            return
        }
        setCurrentPlace(place => {
            place.email = email
            return { ...place }
        })
    }, [email])

    return (
        <TextField
            fullWidth
            {...register('email')}
            label="E-mail address"
            error={errors.email?.message ? true : false}
            helperText={errors.email?.message}
            variant="outlined"
            placeholder="example@mail.org"
            InputProps={{
                startAdornment: <InputAdornment position="start"><MailIcon color="primary" /></InputAdornment>
            }}
        />
    )
}, (prevProps, nextProps) => {
    return prevProps.getValues('email') === nextProps.getValues('email') && prevProps.formState === nextProps.formState
})