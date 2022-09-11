import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from 'store/hooks';

export interface MapProps {
  zoom: number;
  lat: number;
  lng: number;
}

interface PopupProps {
  index: number;
  isOpen: boolean;
}

interface StateProps {
  mapCoords: MapProps;
  popup: PopupProps;
}

export const defaultCoords = {
  zoom: 5,
  lat: 53.13333,
  lng: 23.16433,
};

export const initialState: StateProps = {
  mapCoords: defaultCoords,
  popup: {
    index: -1,
    isOpen: false,
  },
};

const mapDataSlice = createSlice({
  name: 'mapData',
  initialState,
  reducers: {
    setMapCoords: (state, action: PayloadAction<MapProps>) => {
      state.mapCoords = action.payload;
    },
    setPopup: (state, action: PayloadAction<PopupProps>) => {
      state.popup = action.payload;
    },
    setPopupIndex: (state, action: PayloadAction<number>) => {
      state.popup.index = action.payload;
    },
    closePopup: (state) => {
      state.popup.isOpen = false;
      state.mapCoords = defaultCoords;
    },
    resetMap: () => initialState,
  },
});
export const useMapDataSelector = () => useAppSelector((state) => state.mapData.mapCoords);
export const usePopupSelector = () => useAppSelector((state) => state.mapData.popup);
export const { setMapCoords, setPopupIndex, setPopup, closePopup, resetMap } = mapDataSlice.actions;
export const mapDataReducer = mapDataSlice.reducer;
