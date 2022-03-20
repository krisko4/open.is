import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { EmailButton } from './Buttons/EmailButton';
import { EmailField } from './Fields/EmailField';
import { WebsiteField } from './Fields/WebsiteField';
import { InstagramField } from './Fields/InstagramField';
import { FacebookField } from './Fields/FacebookField';
import { PhoneField } from './Fields/PhoneField';
import { WebsiteButton } from './Buttons/WebsiteButton';
import { FacebookButton } from './Buttons/FacebookButton';
import { InstagramButton } from './Buttons/InstagramButton';
import { PhoneButton } from './Buttons/PhoneButton';
import { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
// import { LocationProps } from '../../../../../../redux-toolkit/slices/PlaceProps';
import { SelectedLocationProps } from 'redux-toolkit/slices/selectedLocationsSlice';
import { useAppDispatch } from 'redux-toolkit/hooks';
import { setValid } from 'redux-toolkit/slices/formLocationsSlice';
// import PhoneInput from "react-phone-input-2";


// const phoneRegExp = /(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/;
const facebookRegExp = /^$|(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*?(\/)?([\w\-\.]{5,})/;
const instagramRegExp = /^$|^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/;
const urlRegExp = /^$|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/;


type Inputs = {
  example: string,
  exampleRequired: string,
  website: string,
  phone: string,
  email: string,
  facebook: string,
  instagram: string
};

interface Props {
  location: SelectedLocationProps,
}

const schema = yup.object({
  phone: yup.string().required('Phone number is required').min(8).max(15),
  email: yup.string().email('This is not a valid e-mail address'),
  website: yup.string().matches(urlRegExp, 'This is not a valid URL'),
  facebook: yup.string().matches(facebookRegExp, 'This is not a valid facebook URL'),
  instagram: yup.string().matches(instagramRegExp, 'This is not a valid instagram URL. Please provide just your profile name'),

});

export const LocationDetailsForm: FC<Props> = ({ location }) => {

  //   const { saveButtonClicked, fieldForAll, setFieldForAll } = useLocationContext();
  //   const isFirstRender = useRef(true);
  //   const isFirstFieldForAllRender = useRef(true);

  const dispatch = useAppDispatch();

  const methods = useForm<Inputs>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      phone: location.phone,
      email: location.email,
      website: location.website,
      facebook: location.facebook,
      instagram: location.instagram,
    },
  });

  useEffect(() => {
    dispatch(setValid({
      addressId: location.addressId as string,
      isValid: methods.formState.isValid,
    }));
  }, [methods.formState.isValid]);



  //   useEffect(() => {
  //     if (isFirstFieldForAllRender.current) {
  //       isFirstFieldForAllRender.current = false;
  //       return;
  //     }
  //     //@ts-ignore
  //     if (fieldForAll.field) setValue(fieldForAll.field, fieldForAll.value, { shouldValidate: true });
  //   }, [fieldForAll]);

  //   useEffect(() => {
  //     location.isValid = isValid;
  //     setValidationStateChanged(state => !state);
  //   }, [isValid]);

  //   useEffect(() => {
  //     if (isFirstRender.current) {
  //       isFirstRender.current = false;
  //       return;
  //     }
  //     console.log(getValues());
  //     location = Object.assign(location, getValues());
  //   }, [saveButtonClicked]);


  return (
        <FormProvider {...methods}>
            <form style={{ flexGrow: 1 }} >
                <Grid container justifyContent="center" alignItems="center" sx={{ mb: 1 }}>
                    <Grid item lg={5}>
                        <PhoneButton />
                    </Grid>
                    <Grid item lg={6} >
                        <PhoneField />
                    </Grid>
                </Grid>
                <Grid container justifyContent="center" sx={{ mb: 1 }} alignItems="center">
                    <Grid item lg={5}>
                        <EmailButton/>
                    </Grid>
                    <Grid item lg={6}>
                        <EmailField/>
                    </Grid>
                </Grid>
                <Grid container justifyContent="center" sx={{ mb: 1 }} alignItems="center">
                    <Grid item lg={5}>
                        <WebsiteButton/>
                    </Grid>
                    <Grid item lg={6}>
                        <WebsiteField />
                    </Grid>
                </Grid>
                <Grid container justifyContent="center" sx={{ mb: 1 }} alignItems="center">
                    <Grid item lg={5}>
                        <FacebookButton />
                    </Grid>
                    <Grid item lg={6}>
                        <FacebookField />
                    </Grid>
                </Grid>
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item lg={5}>
                        <InstagramButton/>
                    </Grid>
                    <Grid item lg={6}>
                        <InstagramField />
                    </Grid>
                </Grid>
            </form>
        </FormProvider>
  );
};