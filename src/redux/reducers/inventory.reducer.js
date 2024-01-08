import { combineReducers } from 'redux';


const inventory = (state = [{}], action) => {
    switch (action.type) {
      case 'SET_ITEMS':
        return action.payload;
      default:
        return state;
    }
  }



export default combineReducers({
    inventory,
   
  });
  