import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts } from "./axios";

const intialStateData = {
  isLoading: false,
  products: [],
  totalProduct: 0,
  pagination: { limit: 10, skip: 0, pageNo: 0 },
  isError: null,
};

const ProductsSlice = createSlice({
  name: "productsSlice",
  initialState: intialStateData,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    appendProducts: (state, action) => {
      state.products = [...state.products, ...action.payload];
    },
    setPagination: (state, action) => {
      state.pagination.skip = action.payload + state.pagination.limit;
      state.pagination.pageNo = state.pagination.skip / state.pagination.limit;
    },
    setTotalProducts: (state, action) => {
      state.totalProduct = action.payload;
    },
    setError: (state, action) => {
      state.isError = action.payload;
    },
  },
});

export const fetchProductsAPI = createAsyncThunk(
  "fetchProductsAPI",
  async ({ skip }, { dispatch }) => {
    try {
      const response = await fetchProducts(
        skip,
        intialStateData.pagination.limit
      );
      dispatch(appendProducts(response?.data?.products));
      dispatch(setTotalProducts(response?.data?.total));
    } catch (error) {
      console.log("Error fetching data:", error);
      throw error;
    }
  }
);

export const {
  setLoading,
  setProducts,
  setError,
  setTotalProducts,
  appendProducts,
  setPagination,
} = ProductsSlice.actions;

export default ProductsSlice.reducer;
