// this reducer stores information for one lock at a time used for details view and edit
const lockDetailsReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_LOCK':
        return action.payload;
      case 'CLEAR_LOCK':
        return {};
      default:
        return state;
    }
  };
  
  // lockDetails will be on the redux state at:
  // state.lockDetails
  export default lockDetailsReducer;
  