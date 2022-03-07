import { TextField, InputAdornment, SvgIconTypeMap } from "@mui/material"
import { FC, useEffect, useRef } from "react"
import { FieldValues, useFormContext, useWatch } from "react-hook-form"
import FacebookIcon from '@mui/icons-material/Facebook';
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext";
import { CurrentPlaceProps } from "../../../../../../contexts/PlaceProps";
import React from "react";

interface Props {
    label: string,
    socialMedia: string,
    icon?: any,
    prefix?: string,
    placeholder?: string,
    shouldUpdateCurrentPlace?: boolean,
    color?: any
}


export const SocialMediaFieldContainer: FC<Props> = (props) => {
    const { currentPlace, setCurrentPlace } = useCurrentPlaceContext()
    const methods = useFormContext()
    return <SocialMediaField {...props} {...methods} currentPlace={currentPlace} setCurrentPlace={setCurrentPlace} />

}


interface InnerProps {
    currentPlace: CurrentPlaceProps,
    setCurrentPlace: React.Dispatch<React.SetStateAction<CurrentPlaceProps>>
}

const SocialMediaField: FC<Props & InnerProps & FieldValues> = React.memo((
    {
        currentPlace,
        shouldUpdateCurrentPlace,
        control,
        setCurrentPlace,
        setValue,
        register,
        getValues,
        formState: { errors },
        placeholder,
        label,
        prefix,
        socialMedia,
        icon,
        color
        
    }) => {

    const isFirstRender = useRef(true)

    const val = useWatch({
        control,
        name: socialMedia
    })


    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        if (shouldUpdateCurrentPlace) {
            setCurrentPlace((place: any) => {
                place[socialMedia] = val
                return { ...place }
            })
        }
    }, [val])

    useEffect(() => {
        //@ts-ignore
        setValue(socialMedia, currentPlace[socialMedia])
    }, [socialMedia])

    return (
        <TextField
            color={color}
            label={label}
            fullWidth={true}
            variant="outlined"
            {...register(socialMedia)}
            placeholder={placeholder}
            helperText={errors[socialMedia]?.message}
            error={errors[socialMedia]?.message ? true : false}
            inputProps={{
                maxLength: 50
            }}
            InputProps={{
                startAdornment: (
                    <>
                        {
                            prefix &&
                            <InputAdornment position="start">
                                <p>{prefix}</p>
                            </InputAdornment>
                        }
                    </>
                ),
                endAdornment: (
                    <InputAdornment position="end">
                        {/* <FacebookIcon color="primary" /> */}
                        {icon}
                    </InputAdornment>

                )
            }}
        />
    )
},
    (prevProps, nextProps) => {
        return prevProps.getValues(prevProps.socialMedia) === nextProps.getValues(nextProps.socialMedia) && prevProps.formState === nextProps.formState
    }
)