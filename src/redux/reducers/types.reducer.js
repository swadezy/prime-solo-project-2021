const typesReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_TYPES':
        return action.payload;
      case 'CLEAR_TYPES':
        return [];
      default:
        return state;
    }
  };
  
  // locks will be on the redux state at:
  // state.locks
  export default typesReducer;
  