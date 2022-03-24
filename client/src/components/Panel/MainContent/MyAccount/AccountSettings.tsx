import { LoadingButton } from '@mui/lab';
import { CircularProgress } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  Paper,
  Fade,
  Slide,
  Button,
  Grid,
  TextField,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Backdrop,
} from '@mui/material';
import { Formik, Form, FastField } from 'formik';
import { FC, useEffect, useRef, useState } from 'react';
import { useLoginContext } from '../../../../contexts/LoginContext';
import { removeProfilePicture, updateProfilePicture, updateUserData } from '../../../../requests/UserRequests';
import { useCustomSnackbar } from '../../../../utils/snackbars';
import { PasswordChange } from './PasswordChange';
import * as Yup from 'yup';
import { PhotoCamera } from '@mui/icons-material';
import { ImageUpload } from '../../../reusable/ImageUpload';

const AccountDetailsSchema = Yup.object().shape({
  email: Yup.string().email('This is not a valid e-mail address').required('E-mail address is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  password: Yup.string().matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
    'Password should contain  at least 8 characters, one Uppercase, one lowercase, one number and one special case character'
  ),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const isLetter = (e: React.KeyboardEvent) => {
  const char = e.key;
  if (/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\b]+$/.test(char)) return true;
  else e.preventDefault();
};
export const AccountSettings: FC = () => {
  const [loading, setLoading] = useState(false);
  const [passwordChangeOpen, setPasswordChangeOpen] = useState(false);
  const { enqueueSuccessSnackbar, enqueueErrorSnackbar } = useCustomSnackbar();
  const { userData, setUserData } = useLoginContext();
  const [img, setImg] = useState(userData.img);
  const currentImageRef = useRef(userData.img);
  const [imageFile, setImageFile] = useState<any>(null);
  const isFirstRender = useRef(true);

  const [isHover, setHover] = useState(false);
  const [backdropOpen, setBackdropOpen] = useState(false);

  const initialValues = {
    firstName: userData.fullName.split(' ')[0],
    lastName: userData.fullName.split(' ')[1],
    email: userData.email,
    password: '',
    confirmPassword: '',
  };

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append('img', imageFile);
      await updateProfilePicture(localStorage.getItem('uid') as string, formData);
      enqueueSuccessSnackbar('You have successfully updated your profile picture');
      setUserData((data) => ({
        ...data,
        img: img,
      }));
      localStorage.setItem('img', img as string);

      currentImageRef.current = img;
    } catch (err) {
      enqueueErrorSnackbar();
      setUserData((data) => ({
        ...data,
        img: currentImageRef.current,
      }));
    } finally {
      setBackdropOpen(false);
    }
  };

  const removeImage = async () => {
    try {
      await removeProfilePicture(localStorage.getItem('uid') as string);
      localStorage.removeItem('img');
      enqueueSuccessSnackbar('You have successfully removed your profile picture');
      setUserData((data) => ({
        ...data,
        img: null,
      }));
      currentImageRef.current = null;
    } catch (err) {
      enqueueErrorSnackbar();
      setUserData((data) => ({
        ...data,
        img: currentImageRef.current,
      }));
    } finally {
      setBackdropOpen(false);
    }
  };

  const clearImage = () => {
    setImg(null);
    setImageFile(null);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    (async () => {
      setBackdropOpen(true);
      if (img) {
        await uploadImage();
        return;
      }
      await removeImage();
    })();
  }, [img]);

  const handleSubmit = async (values: typeof initialValues) => {
    console.log(values);
    setLoading(true);
    try {
      const updatedUserData = {
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
        email: values.email,
      };
      const uid = localStorage.getItem('uid') as string;
      const res = await updateUserData(uid, updatedUserData);
      const { user } = res.data;
      const uData = { ...userData };
      if (user.img) {
        localStorage.setItem('img', user.img);
        uData.img = user.img;
      }
      const firstName = userData.fullName.split(' ')[0];
      const lastName = userData.fullName.split(' ')[1];
      if (user.firstName !== firstName || user.lastName !== lastName) {
        const fullName = `${user.firstName} ${user.lastName}`;
        localStorage.setItem('fullName', fullName);
        uData.fullName = fullName;
      }
      setUserData(uData);
      enqueueSuccessSnackbar('You have successfully changed your personal data');
    } catch (err) {
      console.error(err);
      enqueueErrorSnackbar();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container sx={{ overflow: 'hidden', flexGrow: 1 }}>
      <Backdrop open={backdropOpen} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit"></CircularProgress>
      </Backdrop>
      <Fade in={true} timeout={1000}>
        <Grid
          container
          item
          lg={7}
          order={{ lg: 1, xs: 2 }}
          direction="column"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid item sx={{ textAlign: 'center' }}>
            <Typography variant="h2">Account credentials</Typography>
            <Typography variant="h6">Manage your personal data</Typography>
          </Grid>
          <Formik
            initialValues={initialValues}
            validationSchema={AccountDetailsSchema}
            validateOnMount
            onSubmit={handleSubmit}
          >
            {({ dirty, errors, isValid }) => (
              <Form>
                <Grid container justifyContent="center">
                  <Grid container item rowSpacing={2} xs={10} lg={8}>
                    <Grid item container>
                      <FastField
                        fullWidth
                        as={TextField}
                        error={errors.firstName}
                        helperText={errors.firstName}
                        variant="outlined"
                        name="firstName"
                        onKeyDown={isLetter}
                        label="First name"
                      />
                    </Grid>
                    <Grid container item>
                      <FastField
                        fullWidth
                        as={TextField}
                        error={errors.lastName}
                        helperText={errors.lastName}
                        variant="outlined"
                        name="lastName"
                        onKeyDown={isLetter}
                        label="Last name"
                      />
                    </Grid>
                    <Grid container item>
                      <FastField
                        fullWidth
                        as={TextField}
                        error={errors.email}
                        helperText={errors.email}
                        variant="outlined"
                        name="email"
                        label="E-mail address"
                      />
                    </Grid>
                    <Grid container item>
                      <Button color="primary" onClick={() => setPasswordChangeOpen(true)} variant="outlined">
                        Change password
                      </Button>
                      <PasswordChange
                        errors={errors}
                        setPasswordChangeOpen={setPasswordChangeOpen}
                        passwordChangeOpen={passwordChangeOpen}
                      />
                    </Grid>
                    <Grid item container>
                      <LoadingButton
                        size="large"
                        fullWidth
                        sx={{ mb: 1 }}
                        variant="contained"
                        type="submit"
                        loading={loading}
                        disabled={loading || !isValid || !dirty}
                        color="primary"
                      >
                        Submit changes
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      </Fade>

      <Slide direction="left" in={true}>
        <Grid container order={{ xs: 1, lg: 2 }} item lg={5}>
          <Paper sx={{ flexGrow: 1 }}>
            <Grid container sx={{ height: '100%' }} alignItems="center">
              <Grid container direction="column" alignItems="center">
                <Avatar
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                  alt={userData.fullName}
                  sx={{ width: 200, height: 200, mt: 1 }}
                >
                  <Grid
                    justifyContent="center"
                    alignItems="center"
                    container
                    style={{ width: 200, height: 200, position: 'absolute' }}
                  >
                    {img ? (
                      <img
                        src={img as string}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      <PersonIcon style={{ width: '75%', height: '75%' }} />
                    )}
                  </Grid>
                  <Slide direction="up" in={isHover} appear>
                    <Grid
                      justifyContent="center"
                      alignItems="center"
                      container
                      sx={{ height: '100%', background: 'black', opacity: '50%' }}
                    >
                      <ImageUpload name="logo-upload" setImg={setImg} setImageFile={setImageFile}>
                        <IconButton color="primary" size="large" component="span">
                          <PhotoCamera />
                        </IconButton>
                      </ImageUpload>
                      {img && (
                        <IconButton color="error" size="large" onClick={() => clearImage()} component="span">
                          <DeleteForeverIcon />
                        </IconButton>
                      )}
                    </Grid>
                  </Slide>
                </Avatar>
                <Typography variant="h2" sx={{ textAlign: 'center', mt: 3 }}>
                  {userData.fullName}
                </Typography>
                <Typography variant="h6">{userData.email}</Typography>
              </Grid>
              <Grid container justifyContent="center">
                <Grid item xs={8}>
                  <List style={{ flexGrow: 1 }}>
                    <ListItem button>
                      <ListItemIcon>
                        <SettingsIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Account credentials" />
                    </ListItem>
                    <ListItem button>
                      <ListItemIcon>
                        <SettingsIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="My subscriptions" />
                    </ListItem>
                    <ListItem button>
                      <ListItemIcon>
                        <SettingsIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="My places" />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Slide>
    </Grid>
  );
};
