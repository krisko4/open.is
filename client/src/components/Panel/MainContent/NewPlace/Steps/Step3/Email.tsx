

import MailIcon from '@mui/icons-material/Mail';
import { InputAdornment, TextField } from "@mui/material";
import React, { FC, useEffect, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useAppDispatch } from 'redux-toolkit/hooks';
import { setEmail } from 'redux-toolkit/slices/currentPlaceSlice';
import { useEmailSelector } from 'store/selectors/EmailSelector';



export const Email: FC = () => {

    const {control, register, formState: {errors}, setValue} = useFormContext()
    const dispatch = useAppDispatch()
    const email = useEmailSelector()
    

    const currentEmail = useWatch({
        control,
        name: 'email'
    })

    const isFirstRender = useRef(true)

    useEffect(() => {
        if (isFirstRender.current) {
            setValue('email', email)
            isFirstRender.current = false
            return
        }
        dispatch(setEmail(currentEmail))
    }, [currentEmail])

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
}