// this reducer stores information for all pickings
const pickingsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_PICKINGS':
        return action.payload;
      case 'CLEAR_PICKINGS':
        return [];
      default:
        return state;
    }
  };
  
  // locks will be on the redux state at:
  // state.pickings
  export default pickingsReducer;
  