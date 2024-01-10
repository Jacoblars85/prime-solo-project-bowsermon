import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


// function* fetchAllItems() {
//     // console.log('action.payload', action.payload);
//     try {
//       const itemsResponse = yield axios.get(`/api/inventory/items`);
//       yield put({
//         type: 'SET_ITEMS',
//         payload: itemsResponse.data
//       });
//     } catch (error) {
//       console.log('fetchAllItems error:', error);
//     }
//   }


  function* fetchInventory() {
    // console.log('action.payload', action.payload);
    try {
      const inventoryResponse = yield axios.get(`/api/inventory/inventory`);
      yield put({
        type: 'SET_USERS_INVENTORY',
        payload: inventoryResponse.data
      });
    } catch (error) {
      console.log('fetchInventory error:', error);
    }
  }

  function* buyPotion(action) {
    // console.log('action.payload', action.payload.potionId);
    try {
      const response = yield axios({
        method: 'PUT',
        url: `/api/inventory/buy/potion/${action.payload.potionId}`,
        data: {amountNum: action.payload.amountNum}
      })
      yield put({
        type: 'SAGA_FETCH_IVENTORY',
      })
      yield put({
        type: 'FETCH_USER',
      })
    } catch (error) {
      console.log('Unable to put potion into server', error);
    }
  }


  function* sellPotion(action) {
    // console.log('action.payload', action.payload);
    try {
      const response = yield axios({
        method: 'PUT',
        url: `/api/inventory/sell/potion/${action.payload.potionId}`,
        data: {amountNum: action.payload.amountNum}
      })
      yield put({
        type: 'SAGA_FETCH_IVENTORY',
      })
      yield put({
        type: 'FETCH_USER',
      })
    } catch (error) {
      console.log('Unable to sell potion from server', error);
    }
  }


  function* usePotion(action) {
    // console.log('action.payload', action.payload);
    try {
      const response = yield axios({
        method: 'PUT',
        url: `/api/inventory/use/potion/${action.payload.potionId}`,
        data: {amountNum: action.payload.amountNum}
      })
      yield put({
        type: 'SAGA_FETCH_IVENTORY',
      })
    } catch (error) {
      console.log('Unable to use potion server', error);
    }
  }



  function* inventorySaga() {
    // yield takeLatest('SAGA_FETCH_ITEMS', fetchAllItems);
    yield takeLatest('SAGA_FETCH_IVENTORY', fetchInventory);
    yield takeLatest('SAGA_BUY_POTION', buyPotion);
    yield takeLatest('SAGA_SELL_POTION', sellPotion);
    yield takeLatest('SAGA_USE_POTION', usePotion);
  
  }
  
  export default inventorySaga;