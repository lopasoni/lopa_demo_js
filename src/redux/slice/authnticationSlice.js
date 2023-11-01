import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setToast } from './tostSlice';
import { error, succes } from 'App';
import { fetchLoginUserData } from './otherSlice';

//signup
export const fetchSignUpData = createAsyncThunk('/fetch/signup', async (body, thunkapi) => {
  try {
    const responce = await axios.post(`${process.env.REACT_APP_BASE_URL}/SignUp`, body);

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
    return responce.data;
  } catch (e) {
    console.log(e);
  }
});

//login
export const fetchLoginData = createAsyncThunk('/fetch/login', async (body, thunkapi) => {
  try {
    const responce = await axios.post(`${process.env.REACT_APP_BASE_URL}/Login`, body);
    if (responce.data.message === 'login successfully') {
      if (responce.data.data.auth_token) {
        thunkapi.dispatch(
          setToast({
            type: succes,
            msg: 'Please verify otp'
          })
        );
        return { type: 'NAVIGATE_TO_DASHBOARD', responce: responce.data };
      } else {
        thunkapi.dispatch(
          setToast({
            type: error,
            msg: 'Something went wrong'
          })
        );
      }
    } else {
      thunkapi.dispatch(
        setToast({
          type: error,
          msg: responce.data.error.message
        })
      );
    }
  } catch (e) {
    console.log(e);
  }
});

//upadte
export const upadateProfile = createAsyncThunk('/fetch/upadte', async (body, thunkapi) => {
  const token = localStorage.getItem('loginData');

  const config = {
    headers: {
      Authorization: `${token}`
    }
  };

  try {
    const responce = await axios.post(`${process.env.REACT_APP_BASE_URL}/EditProfile`, body, config);

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
          msg: responce.data.error.codeName
        })
      );

    thunkapi.dispatch(fetchLoginUserData());
  } catch (e) {
    console.log(e);
  }
});

//logout
export const handleLogoutData = createAsyncThunk('/fetch/logout', async (_, thunkapi) => {
  try {
    const token = localStorage.getItem('loginData');

    const config = {
      headers: {
        Authorization: `${token}`
      }
    };

    localStorage.removeItem('logintype');
    const responce = await axios.post(`${process.env.REACT_APP_BASE_URL}/Logout`, _, config);

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
          msg: responce.data.error.codeName
        })
      );
  } catch (e) {
    console.log(e);
  }
});

const authnticationSlice = createSlice({
  name: 'authnticationSlice',

  initialState: {
    signupdata: {},
    login: {}
  },

  reducers: {
    handleLogout: (state) => {
      state.login = {};
    }
  },

  extraReducers: function (bulider) {
    bulider.addCase(fetchSignUpData.fulfilled, (state, action) => {
      state.signupdata = action.payload;
    });
    bulider.addCase(fetchLoginData.fulfilled, (state, action) => {
      state.login = action.payload;
    });
    bulider.addCase(upadateProfile.fulfilled, (state, action) => {
      console.log(state, action);
    });
    bulider.addCase(handleLogoutData.fulfilled, (state) => {
      state.login = {};
    });
  }
});

export default authnticationSlice.reducer;
export const { handleLogout } = authnticationSlice.actions;
