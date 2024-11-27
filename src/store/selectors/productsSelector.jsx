import { createSelector } from "@reduxjs/toolkit";

export const productsStore = (store) => store.productsSlice;

export const productsLoadingSelector = createSelector(
  productsStore,
  (products) => products.isLoading
);

export const productsErrorSelector = createSelector(
  productsStore,
  (products) => products.isError
);

export const productsSelector = createSelector(
  productsStore,
  (products) => products.products
);

export const totalProductsSelector = createSelector(
  productsStore,
  (products) => products.totalProduct
);

export const productsPagesSelector = createSelector(
  productsStore,
  (products) => products.pagination
);

export const categoriesSelector = createSelector(
  productsStore,
  (products) => products.categories
);

export const selectedCategoriesSelector = createSelector(
  productsStore,
  (products) => products.selectedCategories
);