import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { error, succes } from 'App';
import axios from 'axios';
import { setToast } from './tostSlice';

//get user details
export const fetchLoginUserData = createAsyncThunk('/fetch/getuserdeyails', async () => {
  try {
    const token = localStorage.getItem('loginData');

    const config = {
      headers: {
        Authorization: `${token}`
      }
    };

    const responce = await axios.post(`${process.env.REACT_APP_BASE_URL}/UserDetails`, undefined, config);
    return responce.data.data;
  } catch (e) {
    console.log(e);
  }
});

//get user details
export const changePassword = createAsyncThunk('/fetch/changepassword', async (body, thunkapi) => {
  try {
    const token = localStorage.getItem('loginData');

    const config = {
      headers: {
        Authorization: `${token}`
      }
    };

    const responce = await axios.post(`${process.env.REACT_APP_BASE_URL}/ChangePassword`, body, config);
    responce.data.message &&
      thunkapi.dispatch(
        setToast({
          type: succes,
          msg: responce.data.message
        })
      );

    responce.data.error &&
      thunkapi.dispatch(
        setToast({
          type: error,
          msg: responce.data.error.message
        })
      );
  } catch (e) {
    console.log(e);
  }
});

const otherSlice = createSlice({
  name: 'otherSlice',

  initialState: {
    loginUserData: {}
  },

  extraReducers: function (bulider) {
    bulider.addCase(fetchLoginUserData.fulfilled, (state, action) => {
      state.loginUserData = action.payload;
    });
    bulider.addCase(changePassword.fulfilled, (state) => {
      console.log(state);
    });
  }
});

export default otherSlice.reducer;
