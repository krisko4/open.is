import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from 'redux-toolkit/hooks';

interface Props{
  email: string
}

const initialState : Props = {
  email: '',
};

const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setEmail: (state, action : PayloadAction<Props>) => {
      return action.payload;
    },

  },
});

export const useEmailSelector = () => useAppSelector(state => state.email);

export const emailReducer = emailSlice.reducer;
export const { setEmail } = emailSlice.actions;