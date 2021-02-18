// this reducer stores successful picking status of all locks
const successReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_SUCCESS':
        return action.payload;
      case 'CLEAR_SUCCESS':
        return [];
      default:
        return state;
    }
  };
  
  // locks will be on the redux state at:
  // state.locks
  export default successReducer;