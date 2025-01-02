const initialState = [];

const sortingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_SORTING_STATE":
      return action.payload;
    default:
      return state;
  }
};

export default sortingReducer;
