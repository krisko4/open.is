import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { FastField, Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import * as Yup from 'yup';
import { usePanelContext } from "../../../../../../contexts/PanelContext";
import { useStepContext } from "../../../../../../contexts/StepContext";

const phoneRegExp = /^[0-9]*$/



// const ContactDetailsSchema = Yup.object().shape({
//     phoneNumber: Yup.string().required().matches(phoneRegExp, 'Phone number is invalid'),
//     email: Yup.string().email().required(),
//     website: Yup.string().required()
// })

export const ContactDetailsForm: FC = () => {

    const { currentPlace, setCurrentPlace } = usePanelContext()
    const [phone, setPhone] = useState(currentPlace.phone)
    const [email, setEmail] = useState(currentPlace.email)
    const [website, setWebsite] = useState(currentPlace.website)
    const [isValid, setValid] = useState(false)
    const {setActiveStep} = useStepContext()
    // const { setActiveStep, contactDetails, setContactDetails } = useStepContext()
    // const handleSubmit = (values: typeof contactDetails) => {
    //     console.log('hello')
    //     console.log(values)
    //     setActiveStep(3)
    // }

    useEffect(() => {
        phone && email && website && phoneRegExp.test(phone) ? setValid(true) : setValid(false)
    }, [phone, email, website])

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            const newCurrentPlace = { ...currentPlace }
            newCurrentPlace.phone = phone
            setCurrentPlace(newCurrentPlace)
        }, 500)
        return () => clearTimeout(delaySearch)
    }, [phone])

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            const newCurrentPlace = { ...currentPlace }
            newCurrentPlace.email = email
            setCurrentPlace(newCurrentPlace)
        }, 500)
        return () => clearTimeout(delaySearch)
    }, [email])

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            const newCurrentPlace = { ...currentPlace }
            newCurrentPlace.website = website
            setCurrentPlace(newCurrentPlace)
        }, 500)
        return () => clearTimeout(delaySearch)
    }, [website])

    return (
        <Grid item container lg={12} justify="space-evenly">
            <Grid item lg={5} style={{ marginTop: 20 }}>
                <Typography>
                    Please provide a contact phone number
                </Typography>
            </Grid>
            <Grid item lg={5}>
                <TextField
                    fullWidth={true}
                    value={phone}
                    type="number"
                    onChange={e => setPhone(e.target.value)}
                    // onKeyUp={(e: React.ChangeEvent<HTMLInputElement>) => { setFieldValue('phoneNumber', e.target.value); setContactDetails(values) }}
                    label="Phone number"
                />
            </Grid>
            <Grid item lg={5} style={{ marginTop: 20 }}>
                <Typography>
                    Please provide a contact e-mail address
                </Typography>
            </Grid>
            <Grid item lg={5}>
                <TextField
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    label="example@mail.com"
                    name="email"
                    type="email"
                    fullWidth={true}
                // onKeyUp={(e: React.ChangeEvent<HTMLInputElement>) => { setFieldValue('email', e.target.value); setContactDetails(values) }}
                >
                </TextField>
            </Grid>
            <Grid item lg={5} style={{ marginTop: 20 }}>
                <Typography>
                    Please provide your personal website address
                </Typography>
            </Grid>
            <Grid item lg={5}>
                <TextField
                    onChange={e => setWebsite(e.target.value)}
                    value={website}
                    label="http://example.com"
                    name="website"
                    fullWidth={true}
                // onKeyUp={(e: React.ChangeEvent<HTMLInputElement>) => { setFieldValue('website', e.target.value); setContactDetails(values) }}
                >
                </TextField>
            </Grid>
            <Grid item lg={10} style={{ marginTop: 10 }}>
                <Button
                    fullWidth={true}
                    variant="contained"
                    style={{ marginTop: 10 }}
                    color="primary"
                    type="submit"
                    disabled={!isValid}
                    onClick={() => setActiveStep(activeStep => activeStep + 1)}
                >
                    Submit
                </Button>
            </Grid>
        </Grid>
        // <Formik
        //     initialValues={contactDetails}
        //     validationSchema={ContactDetailsSchema}
        //     onSubmit={(values) => { handleSubmit(values) }}
        // >
        //     {({ dirty, isValid, setFieldValue, values }) => (
        //         <Form>
        //             <Grid item container lg={12} justify="space-evenly">
        //                 <Grid item lg={5} style={{ marginTop: 20 }}>
        //                     <Typography>
        //                         Please provide a contact phone number
        //                     </Typography>
        //                 </Grid>
        //                 <Grid item lg={5}>
        //                     <FastField
        //                         fullWidth={true}
        //                         onKeyUp={(e: React.ChangeEvent<HTMLInputElement>) => { setFieldValue('phoneNumber', e.target.value); setContactDetails(values) }}
        //                         as={TextField}
        //                         name="phoneNumber"
        //                         type="number"
        //                         label="Phone number"
        //                     />
        //                 </Grid>
        //                 <Grid item lg={5} style={{ marginTop: 20 }}>
        //                     <Typography>
        //                         Please provide a contact e-mail address
        //                     </Typography>
        //                 </Grid>
        //                 <Grid item lg={5}>
        //                     <FastField
        //                         as={TextField}
        //                         label="example@mail.com"
        //                         name="email"
        //                         type="email"
        //                         fullWidth={true}
        //                         onKeyUp={(e: React.ChangeEvent<HTMLInputElement>) => { setFieldValue('email', e.target.value); setContactDetails(values) }}
        //                     >

        //                     </FastField>
        //                 </Grid>
        //                 <Grid item lg={5} style={{ marginTop: 20 }}>
        //                     <Typography>
        //                         Please provide your personal website address
        //                     </Typography>
        //                 </Grid>
        //                 <Grid item lg={5}>
        //                     <FastField
        //                         as={TextField}
        //                         label="http://example.com"
        //                         name="website"
        //                         fullWidth={true}
        //                         onKeyUp={(e: React.ChangeEvent<HTMLInputElement>) => { setFieldValue('website', e.target.value); setContactDetails(values) }}
        //                     >

        //                     </FastField>
        //                 </Grid>
        //                 <Grid item lg={10} style={{ marginTop: 10 }}>
        //                     <Button
        //                         fullWidth={true}
        //                         variant="contained"
        //                         style={{ marginTop: 10 }}
        //                         color="primary"
        //                         type="submit" 
        //                         disabled={!(isValid && dirty)}
        //                     >
        //                         Submit
        //                     </Button>
        //                 </Grid>
        //             </Grid>
        //         </Form>
        //     )}

        // </Formik>
    )

}