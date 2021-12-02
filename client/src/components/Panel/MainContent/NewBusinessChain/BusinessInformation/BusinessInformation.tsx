import { Grid, Typography } from '@material-ui/core'
import { Formik } from 'formik'
import React, { FC, useState } from 'react'
import * as Yup from 'yup'
import { useCurrentPlaceContext } from '../../../../../contexts/PanelContexts/CurrentPlaceContext'
import { BusinessInformationForm } from './BusinessInformationForm'

const BusinessInformationSchema = Yup.object().shape({
    name: Yup.string().required().max(40),
    subtitle: Yup.string().required().max(100),
    description: Yup.string().required().max(600)
})


interface Props {
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>
}
enum Steps {
    BUSINESS_INFORMATION,
    BUSINESS_DETAILS
}
export const BusinessInformation: FC<Props> = ({ setCurrentStep }) => {

    console.log('wtf')
    const handleSubmit = () => {
        setCurrentStep(Steps.BUSINESS_DETAILS)
    }
    const { currentPlace, setCurrentPlace } = useCurrentPlaceContext()

    const [initialValues, setInitialValues] = useState({
        businessName: currentPlace.name,
        subtitle: currentPlace.subtitle,
        description: currentPlace.description
    })

    return <>
        <Grid item container alignItems="center" direction="column" style={{ marginTop: 30 }}>
            <Typography variant="h4">
                Step 1
            </Typography>
            <Typography variant="subtitle1">Basic business information</Typography>
        </Grid>
        <Formik
            validateOnMount
            validationSchema={BusinessInformationSchema}
            onSubmit={handleSubmit}
            initialValues={initialValues}
        >
            <BusinessInformationForm />
        </Formik>
    </>
}