const brandsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_BRANDS':
        return action.payload;
      case 'CLEAR_BRANDS':
        return [];
      default:
        return state;
    }
  };
  
  // locks will be on the redux state at:
  // state.locks
  export default brandsReducer;
  