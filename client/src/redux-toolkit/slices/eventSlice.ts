import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from 'redux-toolkit/hooks';
import { ImageType } from './PlaceProps';

export interface EventProps {
  title: string;
  content: string;
  img: ImageType;
  startDate?: string;
  endDate?: string;
}

const initialState: EventProps = {
  title: '',
  content: '',
  img: `${process.env.REACT_APP_BASE_URL}/images/no-preview.jpg`,
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    setImg: (state, action: PayloadAction<ImageType>) => {
      state.img = action.payload;
    },
    setStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
    reset: () => {
      return initialState;
    },
  },
});

export const useTitleSelector = () => useAppSelector((state) => state.event.title);
export const useContentSelector = () => useAppSelector((state) => state.event.content);
export const useImageSelector = () => useAppSelector((state) => state.event.img);
export const useStartDateSelector = () => useAppSelector((state) => state.event.startDate);
export const useEndDateSelector = () => useAppSelector((state) => state.event.endDate);

export const eventReducer = eventSlice.reducer;
export const { setTitle, setContent, setImg, setStartDate, setEndDate, reset } = eventSlice.actions;
