import { yupResolver } from '@hookform/resolvers/yup';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageIcon from '@mui/icons-material/Language';
import MailIcon from '@mui/icons-material/Mail';
import { LoadingButton } from '@mui/lab';
import { Button, Grid, InputAdornment, SxProps, TextField, Theme, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form';
import ReactPhoneInput from 'react-phone-input-material-ui';
import { useChangeContactDetailsForSelectedLocationsMutation } from 'redux-toolkit/api';
import { useBusinessChainIdSelector } from 'redux-toolkit/slices/businessChainSlice';
import * as yup from 'yup';
import { ContactData } from '../../../../../../../requests/PlaceRequests';
import { useCustomSnackbar } from '../../../../../../../utils/snackbars';

// const phoneRegExp = /(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/;
const facebookRegExp = /^$|(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w-]*\/)*?(\/)?([\w\-.]{5,})/;
const instagramRegExp = /^$|^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/;
const urlRegExp =
  /^$|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/;

type Inputs = {
  website: string;
  phone: string;
  email: string;
  facebook: string;
  instagram: string;
};

const schema = yup.object({
  phone: yup
    .string()
    .min(8)
    .max(15)
    .nullable()
    .transform((value) => (value ? value : null)),
  email: yup.string().email('This is not a valid e-mail address'),
  website: yup.string().matches(urlRegExp, 'This is not a valid URL'),
  facebook: yup.string().matches(facebookRegExp, 'This is not a valid facebook URL'),
  instagram: yup
    .string()
    .matches(instagramRegExp, 'This is not a valid instagram URL. Please provide just your profile name'),
});

interface Props {
  selectedLocations: string[];
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FSProps {
  enabled: boolean;
  name: string;
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  sx?: SxProps<Theme>;
}
const FieldStateButton: FC<FSProps> = ({ name, children, enabled, setEnabled, ...rest }) => {
  const { clearErrors, trigger } = useFormContext();

  useEffect(() => {
    if (!enabled) {
      clearErrors(name);
      return;
    }
    trigger(name);
  }, [enabled]);

  return (
    <Button
      {...rest}
      onClick={() => setEnabled((isEnabled) => !isEnabled)}
      color={enabled ? 'success' : 'primary'}
      variant="outlined"
    >
      {children}
    </Button>
  );
};

export const ContactDetailsEditForm: FC<Props> = ({ setDialogOpen, selectedLocations }) => {
  const { enqueueErrorSnackbar, enqueueSuccessSnackbar } = useCustomSnackbar();

  const [phoneEnabled, setPhoneEnabled] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [websiteEnabled, setWebsiteEnabled] = useState(false);
  const [facebookEnabled, setFacebookEnabled] = useState(false);
  const [instagramEnabled, setInstagramEnabled] = useState(false);
  const businessChainId = useBusinessChainIdSelector();
  const [changeContactDetailsForSelectedLocations, { isLoading }] =
    useChangeContactDetailsForSelectedLocationsMutation();
  const methods = useForm<Inputs>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      phone: '',
      email: '',
      website: '',
      facebook: '',
      instagram: '',
    },
  });
  const {
    control,
    register,
    getValues,
    formState: { errors },
  } = methods;

  const handleClick = async () => {
    try {
      const values: ContactData = {};
      if (phoneEnabled) Object.assign(values, { phone: getValues('phone') });
      if (emailEnabled) Object.assign(values, { email: getValues('email') });
      if (websiteEnabled) Object.assign(values, { website: getValues('website') });
      if (facebookEnabled) Object.assign(values, { facebook: 'https://facebook.com/' + getValues('facebook') });
      if (instagramEnabled) Object.assign(values, { instagram: 'https://instagram.com/' + getValues('instagram') });
      await changeContactDetailsForSelectedLocations({
        placeId: businessChainId as string,
        contactDetails: values,
        locationIds: selectedLocations,
      }).unwrap();
      enqueueSuccessSnackbar('You have successfully changed contact details');
      setDialogOpen(false);
    } catch (err) {
      enqueueErrorSnackbar();
    }
  };

  return (
    <FormProvider {...methods}>
      <Typography sx={{ textAlign: 'center' }} variant="h4">
        Select the fields that you would like to modify.
      </Typography>
      <Grid container justifyContent="center" sx={{ mb: 2, mt: 2 }}>
        <Grid item>
          <FieldStateButton name="phone" enabled={phoneEnabled} setEnabled={setPhoneEnabled}>
            Phone number
          </FieldStateButton>
          <FieldStateButton sx={{ ml: 1 }} name="email" enabled={emailEnabled} setEnabled={setEmailEnabled}>
            E-mail
          </FieldStateButton>
          <FieldStateButton sx={{ ml: 1 }} name="website" enabled={websiteEnabled} setEnabled={setWebsiteEnabled}>
            Website
          </FieldStateButton>
          <FieldStateButton sx={{ ml: 1 }} name="facebook" enabled={facebookEnabled} setEnabled={setFacebookEnabled}>
            Facebook
          </FieldStateButton>
          <FieldStateButton sx={{ ml: 1 }} name="instagram" enabled={instagramEnabled} setEnabled={setInstagramEnabled}>
            Instagram
          </FieldStateButton>
        </Grid>
      </Grid>
      <form style={{ flexGrow: 1 }}>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <ReactPhoneInput
              //@ts-ignore
              disabled={!phoneEnabled}
              //@ts-ignore
              focused={phoneEnabled}
              //@ts-ignore
              defaultCountry={'pl'}
              {...field}
              component={TextField}
              //@ts-ignore
              label={
                <span>
                  Phone number <span style={{ color: 'red' }}>*</span>
                </span>
              }
            />
          )}
        />
        <TextField
          disabled={!emailEnabled}
          focused={emailEnabled}
          helperText={emailEnabled && errors.email?.message}
          sx={{ mt: 1 }}
          error={errors.email?.message && emailEnabled ? true : false}
          label="example@mail.com"
          {...register('email')}
          placeholder="E-mail address"
          color="secondary"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailIcon color="primary" />
              </InputAdornment>
            ),
          }}
          fullWidth
        />
        <TextField
          disabled={!websiteEnabled}
          focused={websiteEnabled}
          sx={{ mt: 1 }}
          helperText={websiteEnabled && errors.website?.message}
          error={websiteEnabled && errors.website?.message ? true : false}
          label="https://example.com"
          placeholder="Personal website"
          color="success"
          {...register('website')}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LanguageIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          disabled={!facebookEnabled}
          focused={facebookEnabled}
          label="https://facebook.com/my-profile"
          helperText={facebookEnabled && errors.facebook?.message}
          error={facebookEnabled && errors.facebook?.message ? true : false}
          {...register('facebook')}
          placeholder="my-profile"
          fullWidth
          color="warning"
          sx={{ mt: 1 }}
          inputProps={{
            maxLength: 50,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <p>https://facebook.com/</p>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <FacebookIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          disabled={!instagramEnabled}
          focused={instagramEnabled}
          label="https://instagram.com/my-profile"
          sx={{ mt: 1 }}
          {...register('instagram')}
          helperText={instagramEnabled && errors.instagram?.message}
          error={instagramEnabled && errors.instagram?.message ? true : false}
          fullWidth
          placeholder="my-profile"
          inputProps={{
            maxLength: 50,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <p>https://instagram.com/</p>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <InstagramIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
        <LoadingButton
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 2 }}
          loading={isLoading}
          disabled={
            isLoading ||
            Object.keys(errors).length > 0 ||
            (!phoneEnabled && !emailEnabled && !websiteEnabled && !facebookEnabled && !instagramEnabled)
          }
          onClick={handleClick}
        >
          Save changes
        </LoadingButton>
      </form>
    </FormProvider>
  );
};
