import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// This will grab all the characters 
function* fetchAllCharacters() {
    try {
      const characterResponse = yield axios.get('/api/characters');
      yield put({
        type: 'SET_CHARACTERS',
        payload: characterResponse.data
      });
    } catch (error) {
      console.log('fetchAllCharacters error:', error);
    }
  }
  

function* characterSaga() {
  yield takeLatest('SAGA_FETCH_CHARACTERS', fetchAllCharacters);
}

export default characterSaga;