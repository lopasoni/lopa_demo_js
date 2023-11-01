import { createSlice } from "@reduxjs/toolkit";

const storeFomData = createSlice({
  name: "storeFomData",

  initialState: {
    alluser: [],
    dataForDisaplay: [],
  },

  reducers: {
    setDataAllUser: (state, action) => {
      state.alluser = action.payload;
    },

    deleteData: (state, action) => {
      const updatedAllUser = [...state.alluser];
      updatedAllUser.splice(action.payload, 1);
      state.alluser = updatedAllUser;
    },

    saveDataForUpdate: (state, action) => {
      state.dataForDisaplay = action.payload;
    },

    updateDataForm: (state, action) => {
      console.log(action.payload);
      const updatedData = [...state.alluser];
     
      const objectToUpdate = updatedData.find(
        (obj, i) => i === action.payload.index
      );
        objectToUpdate.name = action.payload.newData.name;
        objectToUpdate.email = action.payload.newData.email;
        objectToUpdate.password = action.payload.newData.password;
        state.alluser = updatedData;
      
    },
  },
});

export default storeFomData.reducer;
export const { setDataAllUser, deleteData, saveDataForUpdate, updateDataForm } =
  storeFomData.actions;
