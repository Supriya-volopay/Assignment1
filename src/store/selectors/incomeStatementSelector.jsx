import { createSelector } from "@reduxjs/toolkit";

export const incomeStatementStore = (store) => store.incomeStatementSlice

export const incomeStatementLoadingSelector = createSelector(
    incomeStatementStore,
    (incomeStatement) => incomeStatement.isLoading
);

export const incomeStatementErrorSelector = createSelector(
    incomeStatementStore,
    (incomeStatement) => incomeStatement.isError
);

export const annualReportsSelector = createSelector(
    incomeStatementStore,
    (incomeStatement) => incomeStatement.annualReports
);

export const quarterlyReportsSelector = createSelector(
    incomeStatementStore,
    (incomeStatement) => incomeStatement.quarterlyReports
);