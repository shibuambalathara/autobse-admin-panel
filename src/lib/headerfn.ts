import { Dispatch } from "@reduxjs/toolkit";


interface SortingState {
  headerName?: string; // Format: "HeaderName:ASC", "HeaderName:DESC", or undefined
}

export const handleHeaderSort = (

  currentSorting: SortingState,
  dispatch: Dispatch,
  headerName?: string,
  
) => {
  if (!headerName) {
    console.warn("Header name is undefined. Cannot sort.");
    return;
  }

  let newSortingState: SortingState = { headerName: undefined };

  // Toggle ASC -> DESC -> undefined
  if (currentSorting?.headerName === `${headerName}:ASC`) {
    newSortingState = { headerName: `${headerName}:DESC` };
  } else if (currentSorting?.headerName === `${headerName}:DESC`) {
    newSortingState = { headerName: undefined };
  } else {
    newSortingState = { headerName: `${headerName}:ASC` };
  }

  // Dispatch the new state to Redux
  dispatch({ type: "SET_SORTING", payload: newSortingState });
};
