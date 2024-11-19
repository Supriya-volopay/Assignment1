import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./axios.jsx";
import * as gainerLooserData from "../../data/topGainerLooser.json";

let isMockEnable = true;

// Create a shallow copy
const mockData = { ...gainerLooserData };

const intialStateData = {
    isLoading: false,
    data: [],
    top_gainer: [],
    top_loser: [],
    isError: null,
}

// Action
export const fetchAPI = createAsyncThunk("fetchAPI", async (params, { dispatch }) => {
  try {
    if (isMockEnable) {
      const mockedResponse = mockData; 
      dispatch(setData(mockedResponse));
      return mockedResponse;
    } else {
      const response = await axios.get(""); 
      dispatch(setData(response.data)); 
      return response.data; 
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
});

const GainerLooserSlice = createSlice({
  name: "gainerLooser",
  initialState: intialStateData,
  reducers: {
    setLoading : (state, action) => {
      state.isLoading = action.payload;
    },
    setData : (state,action) => {
      state.data = action.payload
    },
    setGainer : (state, action) => {
      state.top_gainer = action.payload;
    },
    setLoser : (state, action) => {
      state.top_loser = action.payload;
    },
    setError : (state, action) => {
      state.isError = action.payload;
    },
  },
  
});

export const {setLoading, setGainer, setLoser, setError, setData} = GainerLooserSlice.actions;

export default GainerLooserSlice.reducer;
