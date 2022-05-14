import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import { format } from 'date-fns';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useAddEventMutation } from 'redux-toolkit/api';
import { useCustomSnackbar } from 'utils/snackbars';
import * as yup from 'yup';
import { EventDate, EventContent, EventTitle } from './Fields';

interface Inputs {
  title: string;
  content: string;
  startDate: Date | null;
  endDate: Date | null;
}

export enum Fields {
  TITLE = 'title',
  CONTENT = 'content',
  START_DATE = 'startDate',
  END_DATE = 'endDate',
}

const schema = yup.object({
  [Fields.TITLE]: yup.string().required('This field is required').max(100, 'You have exceeded the maximum word limit'),
  [Fields.CONTENT]: yup.string().required('This field is required'),
  [Fields.START_DATE]: yup.date().typeError('Start date is required').required(),
  [Fields.END_DATE]: yup
    .date()
    .default(null)
    .typeError('End date is required')
    .required()
    .when('startDate', (startDate) =>
      isNaN(startDate) ? yup.date() : yup.date().min(startDate).typeError('End date is required')
    ),
});
interface Props {
  imageFile: File | null;
}

export const EventForm: FC<Props> = ({ imageFile }) => {
  const [addEvent, { isLoading }] = useAddEventMutation();
  const { enqueueErrorSnackbar, enqueueSuccessSnackbar } = useCustomSnackbar();
  const { locationId } = useParams();

  const methods = useForm<Inputs>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      [Fields.TITLE]: '',
      [Fields.CONTENT]: '',
      [Fields.START_DATE]: null,
      [Fields.END_DATE]: null,
    },
  });

  const handleSubmit = async () => {
    const fieldValues = methods.getValues();
    const event = {
      ...fieldValues,
      startDate: format(fieldValues.startDate as Date, 'yyyy-MM-dd hh:mm'),
      endDate: format(fieldValues.endDate as Date, 'yyyy-MM-dd hh:mm'),
      locationId: locationId as string,
    };
    const form = new FormData();
    if (imageFile) {
      form.append('img', imageFile);
    }
    let key: keyof typeof event;
    for (key in event) form.append(key, event[key]);
    try {
      const res = await addEvent(form).unwrap();
      enqueueSuccessSnackbar('You have successfully created new event');
    } catch (err) {
      enqueueErrorSnackbar();
    }
  };
  return (
    <FormProvider {...methods}>
      <form style={{ flexGrow: 1 }}>
        <Grid item container>
          <EventTitle />
          <Grid container style={{ marginTop: 10, marginBottom: 10 }}>
            <EventContent />
          </Grid>
          <Grid container style={{ marginTop: 10, marginBottom: 10 }}>
            <EventDate />
          </Grid>
          <LoadingButton
            size="large"
            fullWidth={true}
            variant="contained"
            style={{ marginTop: 10 }}
            color="primary"
            disabled={!methods.formState.isValid || isLoading}
            loading={isLoading}
            onClick={handleSubmit}
          >
            Submit
          </LoadingButton>
        </Grid>
      </form>
    </FormProvider>
  );
};
