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
  
  // locks will be on the redux state at:
  // state.locks
  export default lockReducer;
  