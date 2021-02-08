// this reducer stores information for all locks
const locksReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_LOCKS':
        return action.payload;
      case 'CLEAR_LOCKS':
        return [];
      default:
        return state;
    }
  };
  
  // locks will be on the redux state at:
  // state.locks
  export default locksReducer;
  