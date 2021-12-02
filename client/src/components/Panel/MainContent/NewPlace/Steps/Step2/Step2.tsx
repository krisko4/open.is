import { Grid, Typography } from "@material-ui/core";
import { Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import myAxios from "../../../../../../axios/axios";
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext";
import { useStepContext } from "../../../../../../contexts/StepContext";
import * as Yup from 'yup'
import { PlaceDetailsForm } from "./PlaceDetailsForm";


const PlaceDetailsSchema = Yup.object().shape({
    subtitle: Yup.string().required().max(100),
    description: Yup.string().required().max(600)
})

export const Step2: FC = () => {

    console.log('form')
    const { setActiveStep } = useStepContext()
    const { currentPlace, setCurrentPlace } = useCurrentPlaceContext()
    const [initialValues, setInitialValues] = useState({
        businessType: currentPlace.type,
        subtitle: currentPlace.subtitle,
        description: currentPlace.description
    })

    const handleSubmit = (values: typeof initialValues) => {
        let newCurrentPlace = { ...currentPlace }
        console.log(values)
        newCurrentPlace = Object.assign(newCurrentPlace, values)
        setCurrentPlace(newCurrentPlace)
        setActiveStep(2)
    }




    return (
        <Grid item lg={12} container justify="center">
            <Grid item lg={12} style={{ textAlign: 'center' }}>
                <Typography variant="h3">Step 2</Typography>
            </Grid>
            <Grid item lg={12} style={{ textAlign: 'center' }}>
                <Typography variant="subtitle1">Business details</Typography>
            </Grid>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validateOnMount validationSchema={PlaceDetailsSchema}>
                <PlaceDetailsForm />
            </Formik>
        </Grid>
    )
}