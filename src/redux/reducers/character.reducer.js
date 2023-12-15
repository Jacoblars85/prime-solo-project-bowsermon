import { combineReducers } from 'redux';


// Used to store all the characters
const characters = (state = [], action) => {
    switch (action.type) {
      case 'SET_CHARACTERS':
        return action.payload;
      default:
        return state;
    }
  }
  
  // reducer to collect the current
  const currentCharacters = (state = [], action) => {
    if (action.type === '') {
      return action.payload 
  }
  return state;
  }





  export default combineReducers({
    characters,
    currentCharacters,
  });
  