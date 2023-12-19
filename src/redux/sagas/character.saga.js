import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// This will grab all the characters 
function* fetchAllCharacters(action) {
  console.log('action.payload', action.payload);
    try {
      const characterResponse = yield axios.get(`/api/characters/character/${action.payload}`);
      yield put({
        type: 'SET_CHARACTERS',
        payload: characterResponse.data
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
              userID: action.payload.userID, 
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


  

function* characterSaga() {
  yield takeLatest('SAGA_FETCH_CHARACTERS', fetchAllCharacters);
  yield takeLatest('SAGA_FETCH_BATTLE_INFO', fetchAllCharacters);
  yield takeLatest('SAGA_FETCH_BATTLE_INFO', fetchBasicAttacks);
  yield takeLatest('SAGA_FETCH_BATTLE_INFO', fetchLevelEnemy);
  yield takeLatest('SAGA_POST_NEW_CHARACTER', postNewUserCharacter);

}

export default characterSaga;