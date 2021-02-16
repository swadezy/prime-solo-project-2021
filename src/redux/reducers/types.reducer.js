// this reducer stores types
const typesReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_TYPE':
        return state.map((content) =>
          content.id === action.payload.id ? { ...content, type: action.payload.type } : content
        );
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
  