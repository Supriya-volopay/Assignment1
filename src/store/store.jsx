import { configureStore } from "@reduxjs/toolkit";
import GainerLooserReducer from './reducers/gainer&LosserReducer';
import CompanyOverviewReducer from './reducers/companyOverviewReducer';
import IncomeStatementReducer from './reducers/incomeStatementReducer';

export const store = configureStore({
  reducer: {
   gainersLosersSlice : GainerLooserReducer,
   companyOverviewSlice: CompanyOverviewReducer,
   incomeStatementSlice: IncomeStatementReducer,
  },
});
