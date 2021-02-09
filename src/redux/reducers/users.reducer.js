const usersReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_USERS':
        return action.payload;
      case 'UNSET_USERS':
        return [];
      default:
        return state;
    }
  };
  
  // users will be on the redux state at:
  // state.users
  export default usersReducer;
  