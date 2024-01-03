import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// This will grab all the characters 
function* fetchAllCharacters() {
  // console.log('action.payload', action.payload);
  try {
    const characterResponse = yield axios.get(`/api/characters/character`);
    const starterResponse = yield axios.get(`/api/characters/starter`);
    yield put({
      type: 'SET_CHARACTERS',
      payload: characterResponse.data
    });
    yield put({
      type: 'SET_STARTER',
      payload: starterResponse.data
    });
  } catch (error) {
    console.log('fetchAllCharacters error:', error);
  }
}


function* fetchBasicAttacks() {
  try {
    const basicResponse = yield axios.get('/api/characters/basic');
    yield put({
      type: 'SET_BASIC_ATTACKS',
      payload: basicResponse.data
    });
    yield put({
      type: 'SAGA_FETCH_LEVEL_ENEMY'
    });
  } catch (error) {
    console.log('fetchBasicAttacks error:', error);
  }
}


function* fetchLevelEnemy() {
  try {
    const EnemyResponse = yield axios.get('/api/characters/enemy');
    yield put({
      type: 'SET_LEVEL_ENEMY',
      payload: EnemyResponse.data
    });
    yield put({
      type: 'SAGA_FETCH_CHARACTERS'
    });
  } catch (error) {
    console.log('fetchLevelEnemy error:', error);
  }
}


function* postNewUserCharacter(action) {
  try {
    const response = yield axios({
      method: 'POST',
      url: '/api/characters',
      data: {
        characterID: action.payload.characterID
      }
    })
    // yield put({
    //     type: 'SAGA_FETCH_BATTLE_INFO',
    // })
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
      url: `/api/characters/sell`
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
      // payload: action.payload.userID,
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


function* setStarter(action) {
  // console.log('action.payload', action.payload);
  try {
    const response = yield axios({
      method: 'PUT',
      url: `/api/characters/starter/${action.payload}`
    })
    yield put({
      type: 'SAGA_FETCH_STARTER',
    })
  } catch (error) {
    console.log('Unable to put starter to server', error);
  }
}



function* characterSaga() {
  yield takeLatest('SAGA_FETCH_CHARACTERS', fetchAllCharacters);
  yield takeLatest('SAGA_FETCH_BATTLE_INFO', fetchBasicAttacks);
  yield takeLatest('SAGA_FETCH_LEVEL_ENEMY', fetchLevelEnemy);
  yield takeLatest('SAGA_POST_NEW_CHARACTER', postNewUserCharacter);
  yield takeLatest('SAGA_POST_NEW_CHARACTER', takeCoinsAway);
  yield takeLatest('SAGA_SELL_CHARACTER', giveUserCoins);
  yield takeLatest('SAGA_SELL_CHARACTER', deleteCharacter);
  yield takeLatest('SAGA_FETCH_STARTER', fetchStarter);
  yield takeLatest('SAGA_SET_STARTER', setStarter);


}

export default characterSaga;