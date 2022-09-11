import { DateTimePicker, LocalizationProvider, MobileDateTimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Grid, TextField, Typography } from '@mui/material';
import { format, isBefore } from 'date-fns';
import { FC, useEffect, useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useAppDispatch } from 'store/hooks';
import { setEndDate, setStartDate } from 'store/slices/eventSlice';
import { Fields } from '..';

export const EventDate: FC = () => {
  const dispatch = useAppDispatch();
  const { control } = useFormContext();

  const [error, setError] = useState('');
  const start = useWatch({
    control,
    name: Fields.START_DATE,
  });
  const end = useWatch({
    control,
    name: Fields.END_DATE,
  });

  useEffect(() => {
    if (start) {
      dispatch(setStartDate(format(start, 'yyyy-MM-dd hh:mm')));
    }
  }, [start, dispatch]);

  useEffect(() => {
    if (end) {
      dispatch(setEndDate(format(end, 'yyyy-MM-dd hh:mm')));
    }
  }, [end, dispatch]);

  useEffect(() => {
    if (start && end && isBefore(end, start)) {
      setError('Your event should not end before it has started');
      return;
    }
    setError('');
  }, [start, end]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container justifyContent="space-between">
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <MobileDateTimePicker
              renderInput={(props) => <TextField sx={{ flexGrow: 1, pr: 1 }} {...props} />}
              label="Start date"
              minDate={new Date()}
              {...field}
            />
          )}
        />
        <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <MobileDateTimePicker
              renderInput={(props) => <TextField sx={{ flexGrow: 1 }} {...props} />}
              label="End date"
              minDate={new Date()}
              {...field}
            />
          )}
        />
        {error && (
          <Grid container justifyContent={'center'} sx={{ mt: 1 }}>
            <Typography variant="caption" color="error">
              {error}
            </Typography>
          </Grid>
        )}
      </Grid>
    </LocalizationProvider>
  );
};
