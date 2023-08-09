import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import { format } from 'date-fns';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useAddEventMutation } from 'store/api';
import { useSelectedAddressSelector } from 'store/slices/selectedAddressSlice';
import { useCustomSnackbar } from 'utils/snackbars';
import * as yup from 'yup';
import { EventContent, EventDate, EventTitle } from './fields';
import { EventAddress } from './fields/Address';

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
      isNaN(startDate) ? yup.date() : yup.date().min(startDate).typeError('End date is required'),
    ),
});
interface Props {
  imageFile: File | null;
}

export const EventForm: FC<Props> = ({ imageFile }) => {
  const [addEvent, { isLoading }] = useAddEventMutation();
  const { enqueueErrorSnackbar, enqueueSuccessSnackbar } = useCustomSnackbar();
  const { locationId, placeId } = useParams();
  const selectedAddress = useSelectedAddressSelector();

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
    const { addressId, label, lat, lng } = selectedAddress;
    const address = {
      address: label,
      addressId,
      lat,
      lng,
    };
    console.log(fieldValues);
    const event = {
      ...fieldValues,
      ...address,
      startDate: fieldValues.startDate as Date,
      endDate: fieldValues.endDate as Date,
      locationId: locationId as string,
      placeId: placeId as string,
    };
    const form = new FormData();
    if (imageFile) {
      form.append('img', imageFile);
    }
    let key: keyof typeof event;
    for (key in event) form.append(key, event[key].toString());
    try {
      await addEvent(form).unwrap();
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
            <Grid item xs={12}>
              <EventAddress />
            </Grid>
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