import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDataMy = createAsyncThunk('/fetch/data', async () => {
  try {
    const responce = await axios.get('https://jsonplaceholder.typicode.com/users');
    console.log(responce);
    return responce.data;
  } catch (e) {
    console.log(e);
  }
});

const getData = createSlice({
  name: 'getData',

  initialState: {
    userData: []
  },

  extraReducers: function (bulider) {
    bulider.addCase(fetchDataMy.fulfilled, (state, action) => {
      state.userData = action.payload;
    });
  }
});

export default getData.reducer;
