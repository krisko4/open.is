import { LoadingButton } from '@mui/lab';
import { Grid, TextField } from '@mui/material';
import { FastField, Form, Formik } from 'formik';
import React, { FC, useState } from 'react';
import * as Yup from 'yup';
import { ContactFormValues, sendContactMessage } from '../../../requests/ContactRequests';
import { useCustomSnackbar } from '../../../utils/snackbars';

const ContactSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  name: Yup.string().required().max(40),
  content: Yup.string().required().max(400),
});

export const initialValues: ContactFormValues = {
  name: '',
  email: '',
  content: '',
};
const isLetter = (e: React.KeyboardEvent) => {
  // let char = String.fromCharCode(e.keyCode);
  const char = e.key;
  if (/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\b]+$/.test(char)) return true;
  else e.preventDefault();
};

export const ContactForm: FC = () => {
  const [loading, setLoading] = useState(false);
  const { enqueueSuccessSnackbar, enqueueErrorSnackbar } = useCustomSnackbar();

  const handleSubmit = async (values: typeof initialValues) => {
    setLoading(true);
    try {
      await sendContactMessage(values);
      enqueueSuccessSnackbar('Thank you. We have received your message.');
    } catch (err) {
      enqueueErrorSnackbar();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container item>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={ContactSchema} validateOnMount>
        {({ dirty, isValid, values }) => (
          <Form>
            <FastField
              as={TextField}
              onKeyDown={isLetter}
              name="name"
              fullWidth={true}
              label="Please enter your name"
            />
            <FastField
              style={{ marginTop: 10 }}
              as={TextField}
              name="email"
              fullWidth={true}
              label="Please enter your e-mail address"
            />
            <FastField
              style={{ marginTop: 20 }}
              as={TextField}
              fullWidth={true}
              label="This is my message!"
              multiline
              name="content"
              rows={15}
              variant="outlined"
              helperText={`${values.content.length}/400`}
              inputProps={{
                maxLength: 400,
              }}
            />
            <Grid item container justifyContent="flex-end">
              <LoadingButton
                loading={loading}
                disabled={loading || !dirty || !isValid}
                color="primary"
                type="submit"
                variant="contained"
              >
                Submit
              </LoadingButton>
            </Grid>
          </Form>
        )}
      </Formik>
    </Grid>
  );
};
