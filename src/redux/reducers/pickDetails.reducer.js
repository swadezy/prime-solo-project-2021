// this reducer stores information for one lock at a time used for details view and edit
const pickDetailsReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_PICKING':
        return action.payload;
      case 'CLEAR_PICKING':
        return {};
      default:
        return state;
    }
  };
  
  // pickDetails will be on the redux state at:
  // state.pickDetails
  export default pickDetailsReducer;
