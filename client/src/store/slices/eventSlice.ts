import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventData } from 'store/api/types';
import { useAppSelector } from 'store/hooks';
import { ImageType } from './PlaceProps';

export interface EventProps {
  title: string;
  content: string;
  address: string;
  img: ImageType;
  startDate?: string;
  endDate?: string;
}

interface StateProps extends EventProps {
  selectedEvents: EventData[];
}

const initialState: StateProps = {
  title: '',
  content: '',
  address: '',
  img: `${import.meta.env.VITE_BASE_URL}/images/no-preview.jpg`,
  selectedEvents: [],
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setSelectedEvents: (state, action: PayloadAction<EventData[]>) => {
      state.selectedEvents = action.payload;
    },
    addEvents: (state, action: PayloadAction<EventData[]>) => {
      state.selectedEvents.push(...action.payload);
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    setImg: (state, action: PayloadAction<ImageType>) => {
      state.img = action.payload;
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
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
export const useAddressSelector = () => useAppSelector((state) => state.event.address);
export const useImageSelector = () => useAppSelector((state) => state.event.img);
export const useStartDateSelector = () => useAppSelector((state) => state.event.startDate);
export const useEndDateSelector = () => useAppSelector((state) => state.event.endDate);
export const useSelectedEventsSelector = () => useAppSelector((state) => state.event.selectedEvents);

export const eventReducer = eventSlice.reducer;
export const {
  setTitle,
  setAddress,
  setContent,
  setSelectedEvents,
  addEvents,
  setImg,
  setStartDate,
  setEndDate,
  reset,
} = eventSlice.actions;
