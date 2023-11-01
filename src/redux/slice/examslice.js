import { createSlice } from '@reduxjs/toolkit';

const examslice = createSlice({
  name: 'examslice',

  initialState: {
    catagory: [],
    qutions: []
  },

  reducers: {
    addCatagory: (state, action) => {
      state.catagory = [...state.catagory, action.payload];
    },
    addQution: (state, action) => {
      state.qutions = [...state.qutions, action.payload];
    },
    deleteDataCat: (state, action) => {
      const newCatagory = state.catagory.filter((name) => name !== action.payload);
      state.catagory = newCatagory;
      const newQution = state.qutions.filter((item) => item.catagory !== action.payload);
      state.qutions = newQution;
    }
  }
});

export default examslice.reducer;
export const { addCatagory, addQution, deleteDataCat } = examslice.actions;
