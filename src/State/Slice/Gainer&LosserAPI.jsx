import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./axios.jsx";

// Action
export const fetchAPI = createAsyncThunk("fetchAPI", async () => {
  try {
    const response = await axios.get("");
    return response;
  } catch (error) {
    console.log(error);
  }
});

const GainerLooserSlice = createSlice({
  name: "gainerLooser",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAPI.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAPI.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchAPI.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default GainerLooserSlice.reducer;