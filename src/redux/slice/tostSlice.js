import { createSlice } from '@reduxjs/toolkit';

const tostSlice = createSlice({
  name: 'toastSlice',

  initialState: {
    toast: {}
  },

  reducers: {
    setToast: (state, action) => {
      state.toast = action.payload;
    }
  }
});

export default tostSlice.reducer;
export const { setToast } = tostSlice.actions;
