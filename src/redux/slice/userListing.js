import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setToast } from './tostSlice';
import { error, succes } from 'App';

export const fetchAllList = createAsyncThunk('fetchAllList', async (body) => {
  try {
    if (body?.search !== undefined) {
      const responce = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/User2List?sort=${body.order}&column=first_name&search=${body.search}&page=${body.page}&limit=3`
      );
      return responce.data.data;
    } else {
      const responce = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/User2List?sort=${body?.order ? body?.order : 'asc'}&column=first_name&search=&page=${
          body?.page ? body?.page : 1
        }&limit=3`
      );
      return responce.data.data;
    }
  } catch (error) {
    console.log(error);
  }
});
// asc
export const deleteUser = createAsyncThunk('deleteuser', async (body, thunkApi) => {
  try {
    const responce = await axios.post(`${process.env.REACT_APP_BASE_URL}/DeleteUser`, body);
    if (responce?.data?.message === 'delete user successfully') {
      thunkApi.dispatch(
        setToast({
          type: succes,
          msg: responce.data.message
        })
      );
      thunkApi.dispatch(fetchAllList());
    }
  } catch (error) {
    console.log(error);
  }
});

export const updateUser = createAsyncThunk('updateuser', async (body, thunkApi) => {
  try {
    const responce = await axios.post(`${process.env.REACT_APP_BASE_URL}/EditUser`, body);
    thunkApi.dispatch(fetchAllList());

    responce?.data?.message &&
      thunkApi.dispatch(
        setToast({
          type: succes,
          msg: responce.data.message
        })
      );

    responce?.data?.error?.message &&
      thunkApi.dispatch(
        setToast({
          type: error,
          msg: responce.data.error.message
        })
      );
  } catch (error) {
    console.log(error);
  }
});

const userListing = createSlice({
  name: 'userListing',

  initialState: {
    listingData: []
  },

  extraReducers: function (builder) {
    builder.addCase(fetchAllList.fulfilled, (state, action) => {
      state.listingData = action.payload;
    });
  }
});

export default userListing.reducer;
