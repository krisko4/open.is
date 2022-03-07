


import LanguageIcon from '@mui/icons-material/Language';
import { InputAdornment, TextField } from "@mui/material";
import React, { FC, useEffect, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useAppDispatch } from "redux-toolkit/hooks";
import { setWebsite, useWebsiteSelector } from "redux-toolkit/slices/currentPlaceSlice";





export const WebsiteField: FC = () => {


    const isFirstRender = useRef(true)
    const { control, register, formState: { errors }, setValue } = useFormContext()
    const website = useWebsiteSelector()
    const dispatch = useAppDispatch()

    const web = useWatch({
        control,
        name: 'website'
    })


    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            setValue('facebook', website)
            return
        }
        dispatch(setWebsite(web))
    }, [web])



    return (
        <TextField
            color={"secondary"}
            label={"Website address"}
            fullWidth={true}
            variant="outlined"
            {...register('website')}
            placeholder={'https://www.example.com'}
            helperText={errors['website']?.message}
            error={errors['website']?.message ? true : false}
            inputProps={{
                maxLength: 50
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <LanguageIcon color="primary" />
                    </InputAdornment>

                )
            }}
        />
    )

}

