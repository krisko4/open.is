import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useLoginContext } from '../../../contexts/LoginContext';
import { login } from '../../../requests/AuthRequests';
import { useCustomSnackbar } from '../../../utils/snackbars';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('This is not a valid e-mail').required('This field is required'),
  password: Yup.string()
    .required('This field is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      'Password should contain  at least 8 characters, one Uppercase, one lowercase, one number and one special case character'
    ),
});

export interface LoginInputs {
  email: string;
  password: string | null;
}
export const LoginForm = () => {
  const {
    register,
    getValues,
    formState: { isValid, errors },
  } = useForm<LoginInputs>({
    resolver: yupResolver(LoginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { setLoginOpen, setConfirmationOpen, setRegistrationOpen } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { enqueueSuccessSnackbar } = useCustomSnackbar();
  const { setUserData } = useLoginContext();

  const signIn = async () => {
    const loginData = getValues();
    setErrorMessage('');
    setLoading(true);
    try {
      const response = await login({ ...loginData });
      console.log(response.data);
      localStorage.setItem('uid', response.data.uid);
      localStorage.setItem('fullName', response.data.fullName);
      localStorage.setItem('email', loginData.email);
      if (response.data.img) {
        localStorage.setItem('img', response.data.img);
      }
      setLoginOpen(false);
      setUserData({
        fullName: response.data.fullName,
        email: loginData.email,
        img: response.data.img,
        isLoggedIn: true,
      });
      enqueueSuccessSnackbar('You have signed in.');
    } catch (err: any) {
      console.log(err);
      console.log(err.response.data);
      if (err.response.data === 'User is inactive') {
        setLoginOpen(false);
        setConfirmationOpen(true);
        return;
      }
      setLoading(false);
      setErrorMessage('Invalid credentials');
    }
  };

  return (
    <form data-testid="login-form" style={{ flexGrow: 1 }}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid
          container
          item
          xs={8}
          justifyContent="center"
          alignItems="center"
          direction="column"
          style={{ marginBottom: 10 }}
        >
          <Typography variant="h1">Hello!</Typography>
          <Typography variant="h6">Please sign in to continue</Typography>
          {errorMessage && (
            <Typography variant="body2" style={{ textAlign: 'center', color: 'red', marginTop: 10 }}>
              {errorMessage}
            </Typography>
          )}
          <TextField
            type="email"
            {...register('email')}
            fullWidth
            error={errors.email?.message ? true : false}
            helperText={errors.email?.message}
            sx={{ mb: 1, mt: 3 }}
            label="E-mail"
          />
          <TextField
            type="password"
            {...register('password')}
            fullWidth
            error={errors.password?.message ? true : false}
            helperText={errors.password?.message}
            label="Password"
          />
          <Link sx={{ mb: 1 }} variant="caption">
            I forgot my password
          </Link>
          <LoadingButton
            loading={loading}
            data-cy="login-button"
            fullWidth={true}
            size="large"
            color="primary"
            onClick={signIn}
            variant="contained"
            disabled={!isValid || loading}
          >
            Sign in
          </LoadingButton>
          <Typography sx={{ mt: 1 }} variant="caption">
            Don&quot;t have an account?{' '}
            <Link
              data-testid="signup-link"
              onClick={() => {
                setRegistrationOpen(true);
                setLoginOpen(false);
              }}
            >
              Click here to sign up
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </form>
  );
};
