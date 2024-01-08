import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchAllItems() {
    // console.log('action.payload', action.payload);
    try {
      const itemsResponse = yield axios.get(`/api/inventory/items`);
      yield put({
        type: 'SET_ITEMS',
        payload: itemsResponse.data
      });
    } catch (error) {
      console.log('fetchAllItems error:', error);
    }
  }



  function* inventorySaga() {
    yield takeLatest('SAGA_FETCH_ITEMS', fetchAllItems);
   
  
  }
  
  export default inventorySaga;