import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from 'store/hooks';

interface Props {
  email: string;
}

const initialState: Props = {
  email: '',
};

const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

export const useEmailSelector = () => useAppSelector((state) => state.email.email);

export const emailReducer = emailSlice.reducer;
export const { setEmail } = emailSlice.actions;
