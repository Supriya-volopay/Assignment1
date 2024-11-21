import { createSelector } from "@reduxjs/toolkit";

export const companyOverviewStore = (store) => store.companyOverviewSlice

export const companyOverviewLoadingSelector = createSelector(
    companyOverviewStore,
    (companyOverview) => companyOverview.isLoading
);

export const companyOverviewErrorSelector = createSelector(
    companyOverviewStore,
    (companyOverview) => companyOverview.isError
);

export const companyOverviewDataSelector = createSelector(
    companyOverviewStore,
    (companyOverview) => companyOverview.data
);