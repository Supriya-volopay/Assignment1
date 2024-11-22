import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCompanyOverview } from "./axios.jsx";
import * as companyOverview from "../../data/companyOverview.json";

let isMockEnable = true;

// Create a shallow copy of json
const mockData = { ...companyOverview };

const intialStateData = {
  isLoading: false,
  data: [],
  isError: null,
};

const CompanyOverviewSlice = createSlice({
  name: "companyOverviewSlice",
  initialState: intialStateData,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setError: (state, action) => {
      state.isError = action.payload;
    },
  },
});

export const fetchCompanyOverviewAPI = createAsyncThunk(
  "fetchCompanyOverviewAPI",
  async ({ param }, { dispatch }) => {
    try {
      if (isMockEnable) {
        dispatch(setData(mockData));
      } else {
        const response = await fetchCompanyOverview(param.ticker);
        dispatch(setData(response));
      }
    } catch (error) {
      console.log("Error fetching data:", error);
      throw error;
    }
  }
);

export const { setLoading, setData, setError } = CompanyOverviewSlice.actions;

export default CompanyOverviewSlice.reducer;
