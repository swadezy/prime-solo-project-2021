// this reducer stores information for one lock at a time used for details view and edit
const lockReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_LOCK':
        return action.payload;
      case 'CLEAR_LOCK':
        return {};
      default:
        return state;
    }
  };
  
  // details will be on the redux state at:
  // state.details
  export default lockReducer;
  