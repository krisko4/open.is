import { Grid, Typography } from '@material-ui/core'
import { Formik } from 'formik'
import React, { FC, useState } from 'react'
import * as Yup from 'yup'
import { useBusinessChainContext } from '../../../../../contexts/PanelContexts/BusinessChainContext'
import { useCurrentPlaceContext } from '../../../../../contexts/PanelContexts/CurrentPlaceContext'
import { BusinessInformationForm } from './BusinessInformationForm/BusinessInformationForm'

const BusinessInformationSchema = Yup.object().shape({
    name: Yup.string().required().max(40),
    subtitle: Yup.string().required().max(100),
    description: Yup.string().required().max(600)
})


interface Props {
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>,
    setImageFile: React.Dispatch<React.SetStateAction<File | null>>

}
enum Steps {
    BUSINESS_INFORMATION,
    BUSINESS_DETAILS
}
export const BusinessInformation: FC<Props> = ({ setCurrentStep, setImageFile }) => {

    const { currentPlace, setCurrentPlace } = useCurrentPlaceContext()
    const [initialValues, setInitialValues] = useState({
        businessName: currentPlace.name,
        subtitle: currentPlace.subtitle,
        description: currentPlace.description
    })

    const handleSubmit = () => {
        setCurrentStep(Steps.BUSINESS_DETAILS)
    }
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
            <BusinessInformationForm setImageFile={setImageFile} />
        </Formik>
    </>
}