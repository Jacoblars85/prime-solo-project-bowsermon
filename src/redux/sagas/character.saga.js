import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// This will grab all the characters 
function* fetchAllCharacters() {
  // console.log('action.payload', action.payload);
  try {
    const userCharacterResponse = yield axios.get(`/api/characters/user/characters`);
    const starterResponse = yield axios.get(`/api/characters/starter`);
    const basicResponse = yield axios.get('/api/characters/basic');
    const allCharacterResponse = yield axios.get(`/api/characters/all/characters`);
    yield put({
      type: 'SET_BASIC_ATTACKS',
      payload: basicResponse.data
    });
    yield put({
      type: 'SET_USER_CHARACTERS',
      payload: userCharacterResponse.data
    });
    yield put({
      type: 'SET_STARTER',
      payload: starterResponse.data
    });
    yield put({
      type: 'SET_ALL_CHARACTERS',
      payload: allCharacterResponse.data
    });
  } catch (error) {
    console.log('fetchAllCharacters error:', error);
  }
}


function* fetchLevelEnemy(action) {
  // console.log('action. payloaad in level', action.payload);
  try {
    const enemyResponse = yield axios.get(`/api/characters/enemy/${action.payload}`);
    console.log('enemy response', enemyResponse);
    yield put({
      type: 'SET_LEVEL_ENEMY',
      payload: enemyResponse.data
    });
  } catch (error) {
    console.log('fetchLevelEnemy error:', error);
  }
}


function* postNewUserCharacter(action) {
  // console.log('action', action.payloaad);
  try {
    const postResponse = yield axios({
      method: 'POST',
      url: '/api/characters/new/character',
      data: action.payload
    })
    const putResponse = yield axios({
      method: 'PUT',
      url: `/api/characters/buy`,
      data: action.payload
    })
    yield put({
      type: 'FETCH_USER',
    })
  } catch (error) {
    console.log('Unable to posting new character to server', error);
  }
}


function* takeCoinsAway() {
  // console.log('action.payload', action.payload);
  try {
    const response = yield axios({
      method: 'PUT',
      url: `/api/characters/buy`
    })
    yield put({
      type: 'FETCH_USER',
    })
  } catch (error) {
    console.log('Unable to put coins away from server', error);
  }
}


function* giveUserCoins() {
  // console.log('action.payload', action.payload);
  try {
    const response = yield axios({
      method: 'PUT',
      url: `/api/characters/sell/character`
    })
    yield put({
      type: 'FETCH_USER',
    })
  } catch (error) {
    console.log('Unable to put coins to server', error);
  }
}


function* deleteCharacter(action) {
  // console.log('action.payload', action.payload);
  try {
    const response = yield axios({
      method: 'DELETE',
      url: `/api/characters/sell`,
      data: {
        characterID: action.payload.characterID
      }
    })
    yield put({
      type: 'SAGA_FETCH_CHARACTERS',
    })
  } catch (error) {
    console.log('Unable to delete character from server', error);
  }
}


function* fetchStarter() {
  // console.log('action.payload', action.payload);
  try {
    const starterResponse = yield axios.get(`/api/characters/starter`);
    yield put({
      type: 'SET_STARTER',
      payload: starterResponse.data
    });
  } catch (error) {
    console.log('FETCHSTARTER error:', error);
  }
}


function* setStarterOne(action) {
  // console.log('action.payload', action.payload);
  try {
    const response = yield axios({
      method: 'PUT',
      url: `/api/characters/starter/one/${action.payload}`
    })
    yield put({
      type: 'SAGA_FETCH_STARTER',
    })
    yield put({
      type: 'SAGA_FETCH_CHARACTERS',
    })
  } catch (error) {
    console.log('Unable to put starter to 1  server', error);
  }
}

function* setStarterTwo(action) {
  // console.log('action.payload', action.payload);
  try {
    const response = yield axios({
      method: 'PUT',
      url: `/api/characters/starter/two/${action.payload}`
    })
    yield put({
      type: 'SAGA_FETCH_STARTER',
    })
    yield put({
      type: 'SAGA_FETCH_CHARACTERS',
    })
  } catch (error) {
    console.log('Unable to put starter 2 to server', error);
  }
}

function* changeNewStatus(action) {
  // console.log('action.payload', action.payload);
  try {
    const response = yield axios({
      method: 'PUT',
      url: `/api/characters/new/${action.payload}`
    })
    yield put({
      type: 'SAGA_FETCH_CHARACTERS',
    })
  } catch (error) {
    console.log('Unable to put new to server', error);
  }
}

function* clearStarter(action) {
  // console.log('action.payload', action.payload);
  try {
    const response = yield axios({
      method: 'PUT',
      url: `/api/characters/starter/clear/${action.payload}`
    })
    yield put({
      type: 'SAGA_FETCH_STARTER',
    })
    yield put({
      type: 'SAGA_FETCH_CHARACTERS',
    })
  } catch (error) {
    console.log('Unable to put clearing starter  server', error);
  }
}


function* setStarterConditionally(action) {
  // console.log('action.payload', action.payload);
  try {
    const response = yield axios({
      method: 'PUT',
      url: `/api/characters/starter/conditional/${action.payload.characterId}`,
      data: {
        currentStarter: action.payload.currentStarter,
          otherStarter: action.payload.otherStarter
      }
    })
    yield put({
      type: 'SAGA_FETCH_STARTER',
    })
    yield put({
      type: 'SAGA_FETCH_CHARACTERS',
    })
  } catch (error) {
    console.log('Unable to put starter conditionally to server', error);
  }
}


function* changeCharactersNickname(action) {
  // console.log('action.payload', action.payload);
  try {
    const response = yield axios({
      method: 'PUT',
      url: `/api/characters/edit/nickname`,
      data: action.payload
    })
    yield put({
      type: 'SAGA_FETCH_STARTER',
    })
    yield put({
      type: 'SAGA_FETCH_CHARACTERS',
    })
  } catch (error) {
    console.log('Unable to put change nickname to server', error);
  }
}



function* characterSaga() {
  yield takeLatest('SAGA_FETCH_CHARACTERS', fetchAllCharacters);
  yield takeLatest('SAGA_FETCH_LEVEL_ENEMY', fetchLevelEnemy);
  yield takeLatest('SAGA_POST_NEW_CHARACTER', postNewUserCharacter);
  // yield takeLatest('SAGA_POST_NEW_CHARACTER', takeCoinsAway);
  yield takeLatest('SAGA_SELL_CHARACTER', giveUserCoins);
  yield takeLatest('SAGA_SELL_CHARACTER', deleteCharacter);
  yield takeLatest('SAGA_FETCH_STARTER', fetchStarter);
  yield takeLatest('SAGA_SET_STARTER_ONE', setStarterOne);
  yield takeLatest('SAGA_SET_STARTER_TWO', setStarterTwo);
  yield takeLatest('SAGA_SET_OLD', changeNewStatus);
  yield takeLatest('SAGA_CLEAR_STARTER', clearStarter);
  yield takeLatest('SAGA_SET_STARTER_CONDITIONALLY', setStarterConditionally);
  yield takeLatest('SAGA_EDIT_CHARACTERS_NAME', changeCharactersNickname);
}

export default characterSaga;