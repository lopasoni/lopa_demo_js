import customizationReducer from './customizationReducer';
import getData from 'redux/slice/getData';
import storeFormData from 'redux/slice/storeFormData';
import eventCatagorySlice from 'redux/slice/eventCatagorySlice';
import newsData from 'redux/slice/newsData';
import examslice from 'redux/slice/examslice';
import tostSlice from 'redux/slice/tostSlice';
import authnticationSlice from 'redux/slice/authnticationSlice';
import { configureStore } from '@reduxjs/toolkit';
import otherSlice from 'redux/slice/otherSlice';
import userListing from 'redux/slice/userListing';

// ==============================|| REDUX - MAIN STORE ||============================== //

const store = configureStore({
  reducer: {
    customization: customizationReducer,
    getData,
    storeFormData,
    eventCatagorySlice,
    newsData,
    examslice,
    tostSlice,
    authnticationSlice,
    otherSlice,
    userListing
  }
});
const persister = 'Free';

export { store, persister };
