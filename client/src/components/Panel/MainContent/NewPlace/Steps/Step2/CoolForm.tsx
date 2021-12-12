import { Grid, Typography, TextField } from "@material-ui/core";
import { isValid } from "date-fns";
import { FastField } from "formik";
import { FC, useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext";
import { LoadingButton } from "../../../../../reusable/LoadingButton";
import { BusinessType } from "../../../NewBusinessChain/BusinessInformation/BusinessInformationForm/Fields/BusinessType";
import { Description } from "../../../NewBusinessChain/BusinessInformation/BusinessInformationForm/Fields/Description";
import { Subtitle } from "../../../NewBusinessChain/BusinessInformation/BusinessInformationForm/Fields/Subtitle";

type Inputs = {
    subtitle: string,
    description: string,
}

export const CoolForm: FC = () => {
    const { register, handleSubmit, watch, control, setValue, getValues, formState: { errors } } = useForm<Inputs>();
    const [loading, setLoading] = useState(false)
    const { setCurrentPlace } = useCurrentPlaceContext()


    const onSubmit: SubmitHandler<Inputs> = data => {
        console.log(data)
    }




    return (
        // <FormProvider {...methods} >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid item container lg={12} justify="space-evenly">
                    <Grid item lg={5} style={{ marginTop: 20 }}>
                        <Typography>
                            What is the type of your business?
                        </Typography>
                    </Grid>
                    <Grid item lg={5}>
                        <BusinessType />
                    </Grid>
                    <Grid item lg={5} style={{ marginTop: 20 }}>
                        <Typography>
                            Please enter a short subtitle
                        </Typography>
                    </Grid>
                    <Grid item lg={5}>
                        <Subtitle />
                    </Grid>
                    <Grid item lg={10} style={{ marginTop: 20 }}>
                        <Typography style={{ textAlign: 'center' }}>
                            How would you describe your business in few words?
                        </Typography>
                    </Grid>
                    <Grid item lg={10} style={{ marginTop: 10 }}>
                        <Description />
                    </Grid>
                    <Grid item lg={10}>
                        <LoadingButton
                            type="submit"
                            loading={loading}
                            fullWidth={true}
                            variant="contained"
                            style={{ marginTop: 10 }}
                            color="primary"
                            disabled={loading || !isValid}
                        >
                            Submit
                        </LoadingButton>
                    </Grid>
                </Grid>

            </form>
        // </FormProvider>
    )
}