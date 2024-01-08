import { combineReducers } from 'redux';


const items = (state = [], action) => {
    switch (action.type) {
      case 'SET_ITEMS':
        return action.payload;
      default:
        return state;
    }
  }


  const inventory = (state = [], action) => {
    switch (action.type) {
      case 'SET_USERS_INVENTORY':
        return action.payload;
      default:
        return state;
    }
  }



export default combineReducers({
    items,
    inventory,

  });
  