import { combineReducers } from 'redux';


// Used to store all the characters
const characters = (state = [{}], action) => {
  switch (action.type) {
    case 'SET_CHARACTERS':
      return action.payload;
    default:
      return state;
  }
}

const starter = (state = [{ character_id: 1, hp: 50, id: 15, name: "Goomba", profile_pic: "images/Goomba2.webp", stamina: 25, unique_attack: "charge", unique_damage: 10, unique_stamina: 10, user_id: 9 }], action) => {
  switch (action.type) {
    case 'SET_CURRENT_CHARACTERS':
      return action.payload;
    default:
      return state;
  }
}

const basicAttacks = (state = [], action) => {
  if (action.type === 'SET_BASIC_ATTACKS') {
    return action.payload
  }
  return state;
}


const levelEnemy = (state = [{}], action) => {
  if (action.type === 'SET_LEVEL_ENEMY') {
    return action.payload
  }
  return state;
}





export default combineReducers({
  characters,
  basicAttacks,
  levelEnemy,
  starter,
});
