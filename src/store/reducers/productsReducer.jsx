import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchProducts,
  fetchCategories,
  fetchCategoriesProduct,
} from "./axios";

const intialStateData = {
  isLoading: false,
  products: [],
  totalProduct: 0,
  pagination: { limit: 15, skip: 0, pageNo: 0 },
  categories: [],
  selectedCategories: null,
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
    resetProduct: (state, action) => {
      state.products = action.payload;
    },
    setPagination: (state, action) => {
      state.pagination.skip = action.payload + state.pagination.limit;
      state.pagination.pageNo = state.pagination.skip / state.pagination.limit;
    },
    setTotalProducts: (state, action) => {
      state.totalProduct = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    selectedCategories: (state, action) => {
      state.selectedCategories = action.payload;
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

export const fetchCategoriesAPI = createAsyncThunk(
  "fetchCategoriesAPI",
  async (param, { dispatch }) => {
    try {
      const response = await fetchCategories();
      dispatch(setCategories(response?.data.slice(0, 5)));
    } catch (error) {
      console.log("Error fetching data:", error);
      throw error;
    }
  }
);

export const fetchProductByCategoriesAPI = createAsyncThunk(
  "fetchProductByCategoriesAPI",
  async ({ skip, category }, { dispatch }) => {
    try {
      const response = await fetchCategoriesProduct(
        category,
        skip,
        intialStateData.pagination.limit
      );
      dispatch(resetProduct([]));
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
  resetProduct,
  setPagination,
  setCategories,
  selectedCategories,
} = ProductsSlice.actions;

export default ProductsSlice.reducer;
