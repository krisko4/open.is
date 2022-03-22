import { Rating } from '@mui/material';
import { FC } from 'react';
import { useAverageNoteSelector } from 'redux-toolkit/slices/currentPlaceSlice';

export const PlaceRating: FC = () => {
  const averageNote = useAverageNoteSelector();
  return <Rating style={{ marginTop: 20 }} name="simple-controlled" value={averageNote?.average || 0} readOnly />;
};
