import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./axios.jsx";
import * as gainerLooserData from "../../data/topGainerLooser.json";

let isMockEnable = false;

// Create a shallow copy
const mockData = { ...gainerLooserData };

const intialStateData = {
    isLoading: false,
    metadata: "",
    topGainer: [],
    topLoser: [],
    isError: null,
}

// Action
export const fetchAPI = createAsyncThunk("fetchAPI", async (params, { dispatch }) => {
  try {
    if (isMockEnable) {
      dispatch(setMetadata(mockData.metadata));
      dispatch(setGainer(mockData.top_gainers));
      dispatch(setLoser(mockData.top_losers));

    } else {
      const response = await axios.get(""); 
      dispatch(setMetadata(response.data?.metadata));
      dispatch(setGainer(response.data?.top_gainers));
      dispatch(setLoser(response.data?.top_losers));

    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
});

const GainerLooserSlice = createSlice({
  name: "gainersLosers",
  initialState: intialStateData,
  reducers: {
    setLoading : (state, action) => {
      state.isLoading = action.payload;
    },
    setMetadata : (state, action) => {
      state.metadata = action.payload;
    },
    setGainer : (state, action) => {
      state.topGainer = action.payload;
    },
    setLoser : (state, action) => {
      state.topLoser = action.payload;
    },
    setError : (state, action) => {
      state.isError = action.payload;
    },
  },
  
});

export const {setLoading, setMetadata, setGainer, setLoser, setError} = GainerLooserSlice.actions;

export default GainerLooserSlice.reducer;
