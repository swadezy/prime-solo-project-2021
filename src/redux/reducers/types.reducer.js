// this reducer stores types
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
  
  // types will be on the redux state at:
  // state.types
  export default typesReducer;
  