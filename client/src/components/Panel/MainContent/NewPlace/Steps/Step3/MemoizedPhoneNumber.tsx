import { TextField } from "@mui/material"
import React, { useRef } from "react"
import { FC, useEffect } from "react"
import { Controller, FieldValues, useFormContext, useWatch } from "react-hook-form"
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext"
import { CurrentPlaceProps } from "../../../../../../contexts/PlaceProps"
import ReactPhoneInput from 'react-phone-input-material-ui';
import PhoneInput from "react-phone-input-material-ui"
// import "react-phone-input-material-ui/lib/style.css";


export const PhoneNumberContainer: FC = () => {
    const methods = useFormContext()
    const { currentPlace, setCurrentPlace } = useCurrentPlaceContext()
    return <PhoneNumber setCurrentPlace={setCurrentPlace} currentPlace={currentPlace} {...methods} />
}

interface Props {
    currentPlace: CurrentPlaceProps,
    setCurrentPlace: React.Dispatch<React.SetStateAction<CurrentPlaceProps>>,
}

const PhoneNumber = React.memo<Props & FieldValues>(({ currentPlace, setCurrentPlace, control, setValue, formState: { errors } }) => {

    const phone = useWatch({
        control,
        name: 'phone'
    })

    const isFirstRender = useRef(true)

    useEffect(() => {
        if (isFirstRender.current) {
            setValue('phone', currentPlace.phone)
            isFirstRender.current = false
            return
        }
        setCurrentPlace(place => {
            place.phone = phone
            return { ...place }
        })
    }, [phone])
    return (
        <Controller
            name="phone"
            control={control}
            render={
                ({ field }) =>
                    <ReactPhoneInput
                        style={
                            {
                                flexGrow: 1,
                            }
                        }
                        {...field}
                        //@ts-ignore
                        component={TextField}
                        label={<span>Phone number <span style={{ color: 'red' }}>*</span></span>}
                    />
            }
        />
    )
}, (prevProps, nextProps) => {
    return prevProps.getValues('phone') === nextProps.getValues('phone')
})