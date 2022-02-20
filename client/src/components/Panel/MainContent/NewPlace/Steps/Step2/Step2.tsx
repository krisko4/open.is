import { Autocomplete, Fade, Grid, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import * as Yup from 'yup';
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext";
import { useStepContext } from "../../../../../../contexts/StepContext";
import { BusinessType } from "../../../NewBusinessChain/BusinessInformation/BusinessInformationForm/Fields/BusinessType";
import { PlaceDetailsForm } from "./PlaceDetailsForm";

const PlaceDetailsSchema = Yup.object().shape({
    subtitle: Yup.string().required().max(100),
    description: Yup.string().required().max(600),
    businessType: Yup.string().required()
})

export const Step2: FC = () => {
    
    
    return (
        <Fade in={true} timeout={1500}>
            <Grid item container justifyContent="center" style={{ marginTop: 20 }}>
                <Grid container direction="column" alignItems="center">
                    <Typography variant="h3">Step 2</Typography>
                    <Typography variant="subtitle1">Business details</Typography>
                </Grid>
                {/* <Formik initialValues={initialValues} onSubmit={handleSubmit} validateOnMount validationSchema={PlaceDetailsSchema}> */}
                <PlaceDetailsForm />
                {/* </Formik> */}
            </Grid >
        </Fade>
    );
}