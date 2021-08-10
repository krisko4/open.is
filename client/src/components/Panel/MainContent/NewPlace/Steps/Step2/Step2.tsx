import React, {FC} from "react";
import {Grid, MenuItem, Select, TextField, Typography} from "@material-ui/core";
import {Field, Formik} from "formik";
import {Autocomplete} from "@material-ui/lab";


const placeDetails = {
    type: '',
    subtitle: '',
    description: '',
    phoneNumber: '',
    email: '',
    website: ''
}

const submitForm = () => {
    console.log('hello')
}


const places: string[] = [
    'restaurant',
    'grocery store'
]


export const Step2: FC = () => {

    const [age, setAge] = React.useState('');

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAge(event.target.value as string);
    };

    return (
        <Grid item lg={12} container justify="center">
            <Grid item lg={12} style={{textAlign: 'center'}}>
                <Typography variant="h3">Step 2</Typography>
            </Grid>
            <Grid item lg={12} style={{textAlign: 'center'}}>
                <Typography variant="subtitle1">Place details</Typography>
            </Grid>
            <Formik
                initialValues={placeDetails}
                onSubmit={() => submitForm()}
            >
                {({dirty, isValid}) => (
                    <Grid item container lg={12} justify="space-evenly">
                        <Grid item lg={5} style={{marginTop: 20}}>
                            <Typography>
                                What is the type of your business?
                            </Typography>
                        </Grid>
                        <Grid item lg={5}>
                            <Autocomplete
                                id="combo-box-demo"
                                options={places}
                                // getOptionLabel={(option) => option.title}
                                fullWidth={true}
                                renderInput={(params) => <TextField {...params} label="Choose your business type"/>}
                            />
                        </Grid>
                        <Grid item lg={5} style={{marginTop: 20}}>
                            <Typography>
                                Please enter a short subtitle
                            </Typography>
                        </Grid>
                        <Grid item lg={5}>
                            <TextField fullWidth={true} label='Subtitle'/>
                        </Grid>
                        <Grid item lg={5} style={{marginTop: 20}}>
                            <Typography>
                                How would you describe your business in few words?
                            </Typography>
                        </Grid>
                        <Grid item lg={5}>
                            <TextField
                                fullWidth={true}
                                label="Description"
                                multiline
                                rows={2}
                                rowsMax={4}
                            />
                        </Grid>
                    </Grid>
                )}
            </Formik>
        </Grid>
    )
}