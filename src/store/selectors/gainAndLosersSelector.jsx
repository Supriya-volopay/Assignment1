import { createSelector } from "@reduxjs/toolkit";

export const gainerLoserStore = (store) => store.gainersLosersSlice  //name of the slice

export const gainerAndLoserLoadingSelector = createSelector(
    gainerLoserStore,
    (gainerAndLooser) => gainerAndLooser.isLoading
);

export const gainerAndLoserErrorSelector = createSelector(
    gainerLoserStore,
    (gainerAndLooser) => gainerAndLooser.isError
);

export const metadataSelector = createSelector(
    gainerLoserStore,
    (gainerAndLooser) => gainerAndLooser.metadata
);

export const gainerSelector = createSelector(
    gainerLoserStore,
    (gainerAndLooser) => gainerAndLooser.topGainer
);

export const loserSelector = createSelector(
    gainerLoserStore,
    (gainerAndLooser) => gainerAndLooser.topLoser
);