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
  const enemy = (state = [], action) => {
    if (action.type === '') {
      return action.payload 
  }
  return state;
  }

  const basicAttacks = (state = {}, action) => {
    if (action.type === 'SET_BASIC_ATTACKS') {
      return action.payload 
  }
  return state;
  }


  const levelEnemy = (state = {}, action) => {
    if (action.type === 'SET_LEVEL_ENEMY') {
      return action.payload 
  }
  return state;
  }





  export default combineReducers({
    characters,
    enemy,
    basicAttacks,
    levelEnemy,
  });
  