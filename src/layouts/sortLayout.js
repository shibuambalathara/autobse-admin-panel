import { createSlice } from '@reduxjs/toolkit';

const sortingSlice = createSlice({
  name: 'sorting',
  initialState: {},
  reducers: {
    setSorting: (state, action) => {
      const { field, order } = action.payload;
      state[field] = order;
    },
    clearSorting: () => ({}),
  },
});

export const { setSorting, clearSorting } = sortingSlice.actions;
export default sortingSlice.reducer;
