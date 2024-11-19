import { configureStore } from "@reduxjs/toolkit";
import GainerLooserReducer from './reducers/gainer&LosserReducer';

export const store = configureStore({
  reducer: {
    GainerLooser: GainerLooserReducer,
  },
});
