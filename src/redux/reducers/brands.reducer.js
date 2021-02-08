// this reducer stores brands
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
  
  // brands will be on the redux state at:
  // state.brands
  export default brandsReducer;
  