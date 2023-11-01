import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNews = createAsyncThunk("fetch", async (data) => {
  try {
    if (data) {
      const fetchDataFromapi = await axios.get(
        `https://newsdata.io/api/1/news?apikey=pub_31126cba7b4f032a3a2a85d4a9d9b00ddad88&q=football&page=${data}`
      );
      return fetchDataFromapi.data;
    } else {
      const fetchDataFromapinormal = await axios.get(
        `https://newsdata.io/api/1/news?apikey=pub_31126cba7b4f032a3a2a85d4a9d9b00ddad88&q=football`
      );
      console.log(fetchDataFromapinormal.data);
      return fetchDataFromapinormal.data;
    }
  } catch (error) {
    console.log(error);
  }
});

export const searchdata = createAsyncThunk("fetch/serchdata", async (data) => {
  try {
    const fetchDataFromapi = await axios.get(
      `https://newsdata.io/api/1/news?apikey=pub_31126cba7b4f032a3a2a85d4a9d9b00ddad88&q=${data}`
    );
    return fetchDataFromapi.data;
  } catch (error) {
    console.log(error);
  }
});

const newsData = createSlice({
  name: "newsData",

  initialState: {
    allData: [],
    curruntPage: [{ index: 1, id: "" }],
  },

  reducers: {
    setPrviosPageNum: (state, action) => {
      const isPresent = state.curruntPage.find(
        (item) => item.curruntId === action.payload.id
      );
      if (!isPresent) {
        const cloneCurruntPage = [...state.curruntPage];
        let findLastelement =
          cloneCurruntPage[cloneCurruntPage.length - 1].index;
        state.curruntPage = [
          ...state.curruntPage,
          { index: findLastelement + 1, curruntId: action.payload.id },
        ];
      }
    },
  },

  extraReducers: function (builder) {
    builder.addCase(fetchNews.fulfilled, (state, action) => {
      state.allData = action.payload;
    });
    builder.addCase(searchdata.fulfilled, (state, action) => {
      state.allData = action.payload;
    });
  },
});

export default newsData.reducer;
export const { setPrviosPageNum } = newsData.actions;
