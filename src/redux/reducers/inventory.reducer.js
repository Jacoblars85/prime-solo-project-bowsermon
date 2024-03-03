import { combineReducers } from 'redux';


const consumables = (state = [], action) => {
    switch (action.type) {
      case 'SET_CONSUMABLE_ITEMS':
        return action.payload;
      default:
        return state;
    }
  }

  const held = (state = [], action) => {
    switch (action.type) {
      case 'SET_HELD_ITEMS':
        return action.payload;
      default:
        return state;
    }
  }


  const inventory = (state = [{}], action) => {
    switch (action.type) {
      case 'SET_USERS_INVENTORY':
        return action.payload;
      default:
        return state;
    }
  }



export default combineReducers({
  consumables,
  held,
    inventory,

  });
  