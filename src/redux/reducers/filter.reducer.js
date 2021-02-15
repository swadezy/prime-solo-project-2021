// this reducer stores the filter information for the lock history view
const filterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload;
    case 'CLEAR_FILTER':
      return 0;
    default:
      return state;
  }
};

// filter will be on the redux state at:
// state.filter
export default filterReducer;
