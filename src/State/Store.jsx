import { configureStore } from "@reduxjs/toolkit";
import GainerLooserReducer from './Slice/Gainer&LosserAPI';

export const store = configureStore({
  reducer: {
    GainerLooser: GainerLooserReducer,
  },
});
