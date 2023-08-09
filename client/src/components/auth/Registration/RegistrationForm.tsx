import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { differenceInYears } from 'date-fns';
import * as React from 'react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch } from 'store/hooks';
import { setEmail } from 'store/slices/emailSlice';
import * as Yup from 'yup';
import { signUp } from '../../../api/auth';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useCustomSnackbar } from '../../../utils/snackbars';

const isLetter = (e: React.KeyboardEvent) => {
  // let char = String.fromCharCode(e.keyCode);
  const char = e.key;
  if (/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\b]+$/.test(char)) return true;
  else e.preventDefault();
};

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required('This field is required'),
  lastName: Yup.string().required('This field is required'),
  email: Yup.string().email('This is not a valid e-mail address').required('This field is required'),
  confirmEmail: Yup.string()
    .required('This field is required')
    .oneOf([Yup.ref('email'), null], 'E-mail addresses must match'),
  password: Yup.string()
    .required('This field is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      'Password should contain  at least 8 characters, one Uppercase, one lowercase, one number and one special case character',
    ),
  confirmPassword: Yup.string()
    .required('This field is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  birthdate: Yup.string()
    .nullable()
    .test('birthdate', 'You should be at least 18 years old', function (birthdate) {
      const yearDiff = differenceInYears(new Date(), new Date(birthdate as string));
      return yearDiff >= 18;
    })
    .required('Please enter your date of birth'),
});

export interface RegistrationInputs {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  confirmPassword: string;
  password: string;
  birthdate: Date | null;
}

export const RegistrationForm = () => {
  const { setLoginOpen, setRegistrationOpen, setConfirmationOpen } = useAuthContext();
  const [errorMessage, setErrorMessage] = useState('');
  const { enqueueSuccessSnackbar, enqueueErrorSnackbar } = useCustomSnackbar();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const {
    register,
    getValues,
    control,
    formState: { isValid, errors },
  } = useForm<RegistrationInputs>({
    resolver: yupResolver(SignupSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      confirmEmail: '',
      confirmPassword: '',
      password: '',
      birthdate: new Date(),
    },
  });

  const registerUser = async () => {
    const userData = getValues();
    setLoading(true);
    setErrorMessage('');
    console.log(userData);
    try {
      await signUp(userData);
      setRegistrationOpen(false);
      setConfirmationOpen(true);
      dispatch(setEmail(userData.email));
      enqueueSuccessSnackbar('You have successfully registered your account');
    } catch (err: any) {
      console.error(err);
      enqueueErrorSnackbar();
      setErrorMessage(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  console.log(isValid, errors);

  return (
    <form data-testid="registration-form" style={{ flexGrow: 1 }}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid container item xs={10} lg={8} alignItems="center" direction="column">
          <Typography variant="h1">Hello!</Typography>
          <Typography variant="h6" sx={{ color: 'grey' }}>
            Please sign up to continue
          </Typography>
          {errorMessage && (
            <Typography variant="caption" style={{ textAlign: 'center' }} color="error">
              {errorMessage}
            </Typography>
          )}
          <Grid container justifyContent="space-evenly" sx={{ mb: 1, mt: 5 }}>
            <TextField
              onKeyDown={isLetter}
              sx={{ flexGrow: 1, mr: { lg: 1, xs: 0 }, mb: { lg: 0, xs: 1 } }}
              label="First name"
              helperText={errors.firstName?.message}
              {...register('firstName')}
              error={errors.firstName?.message ? true : false}
              name="firstName"
            />
            <TextField
              sx={{ flexGrow: 1 }}
              onKeyDown={isLetter}
              {...register('lastName')}
              helperText={errors.lastName?.message}
              error={errors.lastName?.message ? true : false}
              label="Last name"
            />
          </Grid>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              name="birthdate"
              control={control}
              defaultValue={null}
              render={({ field, fieldState: { error, invalid } }) => (
                <DatePicker
                  label="Date of birth"
                  inputFormat="MM/dd/yyyy"
                  {...field}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={invalid}
                      helperText={error ? error.message : null}
                      sx={{ mb: 1, width: '100%' }}
                    />
                  )}
                />
              )}
            />
          </LocalizationProvider>
          <TextField
            fullWidth
            sx={{ mb: 1 }}
            label="E-mail"
            helperText={errors.email?.message}
            {...register('email')}
            error={errors.email?.message ? true : false}
            type="email"
            name="email"
          />
          <TextField
            sx={{ mb: 1 }}
            fullWidth
            {...register('confirmEmail')}
            helperText={errors.confirmEmail?.message}
            error={errors.confirmEmail?.message ? true : false}
            label="Confirm E-mail"
            type="email"
            name="confirmEmail"
          />
          <TextField
            fullWidth={true}
            label="Password"
            sx={{ mb: 1 }}
            helperText={errors.password?.message}
            error={errors.password?.message ? true : false}
            type="password"
            {...register('password')}
          />
          <TextField
            fullWidth
            {...register('confirmPassword')}
            label="Confirm password"
            sx={{ mb: 1 }}
            helperText={errors.confirmPassword?.message}
            error={errors.confirmPassword?.message ? true : false}
            type="password"
          />
          <LoadingButton
            disabled={!isValid || loading}
            fullWidth={true}
            onClick={registerUser}
            size="large"
            loading={loading}
            color="primary"
            variant="contained"
          >
            Sign up
          </LoadingButton>
          {/* <Grid item xs={10} style={{ textAlign: 'center' }}>
                                        <h4>OR</h4>
                                    </Grid>
                                    <Grid item xs={10} style={{ marginBottom: 10 }}>
                                        <GoogleLoginButton />
                                    </Grid>
                                    <Grid item xs={10}>
                                        <FacebookLoginButton />
                                         <Button color="primary" onClick={() => signInWithFacebook()}>Sign in with facebook</Button>
                                    </Grid> */}
          <Typography sx={{ mt: 1 }} variant="caption">
            Already have an account?&nbsp;
            <Link
              data-testid="signin-link"
              onClick={() => {
                setLoginOpen(true);
                setRegistrationOpen(false);
              }}
            >
              Click here to sign in
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </form>
  );
};
