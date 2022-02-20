import { yupResolver } from "@hookform/resolvers/yup";
import { Autocomplete, Grid, TextField } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { Form, useFormikContext } from "formik";
import { FC, useEffect, useState } from "react";
import { Controller, FormProvider, useForm, useWatch } from "react-hook-form";
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext";
import { getBusinessTypes } from "../../../../../../requests/BusinessTypeRequests";
import { LoadingButton } from "../../../../../reusable/LoadingButton";
import * as yup from "yup";
import { SubtitleContainer } from "./Subtitle";
import { BusinessTypeContainer } from "./BusinessType";
import { DescriptionContainer } from "./Description";

const schema = yup.object({
    subtitle: yup.string()
})

interface Inputs {
    subtitle: string,
    type: string | null,
    description: string
}

export const PlaceDetailsForm: FC = () => {

    // const { values, isValid } = useFormikContext<any>()
    // const { currentPlace,setCurrentPlace} = useCurrentPlaceContext()
    const [loading, setLoading] = useState(false)


    const methods = useForm<Inputs>({
        resolver: yupResolver(schema),
        mode: 'onChange',
        defaultValues: {
            subtitle: '',
            type: null,
            description: ''
        }
    });


    // const type = useWatch({
    //     control,
    //     name: 'type'
    // })



    // useEffect(() => {
    //     setCurrentPlace(place => {
    //         place.type = type
    //         return { ...place }
    //     })
    // }, [type])


    return (
        <FormProvider {...methods}>

            <form style={{ flexGrow: 1 }}>
                <Grid item container>
                    <BusinessTypeContainer />
                    {/* <Controller
                    control={control}
                    name="type"
                    render={({ field: { onChange, value } }) =>
                    (
                        <Autocomplete
                            onChange={(e, value) => onChange(value)}
                            value={value}
                            options={businessTypes}
                            fullWidth={true}
                            renderInput={(params) => <TextField
                                placeholder="Select your business type"
                                error={errors.type?.message ? true : false}
                                helperText={errors.type?.message && <span style={{ color: 'red' }}>Please choose a correct business type</span>}
                                variant="outlined"
                                color="primary"
                                {...params}
                                label="Business type" />}
                        />
                    )

                    }
                /> */}
                    {/* <Autocomplete
                    fullWidth
                    disablePortal
                    id="combo-box-demo"
                    options={['first', 'second']}
                    renderInput={(params) => <TextField {...params} focused label="Movie" />}
                /> */}
                    {/* <Grid container style={{ marginTop: 10, marginBottom: 10 }}>
                    <BusinessType />
                </Grid> */}
                    <Grid container style={{ marginTop: 10, marginBottom: 10 }}>
                        <SubtitleContainer />
                    </Grid>
                    <DescriptionContainer />
                    <LoadingButton
                        size="large"
                        loading={loading}
                        fullWidth={true}
                        variant="contained"
                        style={{ marginTop: 10 }}
                        color="primary"
                        onClick={() => console.log(methods.getValues())}
                        disabled={loading}
                    >
                        Submit
                    </LoadingButton>
                </Grid>
            </form>
        </FormProvider>
        // <Form style={{ flexGrow: 1 }}>
        //     <Grid item container>
        //         {/* <Autocomplete
        //             fullWidth
        //             disablePortal
        //             id="combo-box-demo"
        //             options={['first', 'second']}
        //             renderInput={(params) => <TextField {...params} focused label="Movie" />}
        //         /> */}
        //         <Grid container style={{ marginTop: 10, marginBottom: 10 }}>
        //             <BusinessType />
        //         </Grid>
        //         <Grid container style={{ marginTop: 10, marginBottom: 10 }}>
        //             <Subtitle />
        //         </Grid>
        //         <Description />
        //         <LoadingButton
        //             size="large"
        //             loading={loading}
        //             fullWidth={true}
        //             variant="contained"
        //             style={{ marginTop: 10 }}
        //             color="primary"
        //             type="submit"
        //             disabled={loading || !isValid}
        //         >
        //             Submit
        //         </LoadingButton>
        //     </Grid>
        // </Form>
    );
}