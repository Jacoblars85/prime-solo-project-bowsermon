import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchAllItems() {
    // console.log('action.payload', action.payload);
    try {
      const itemsResponse = yield axios.get(`/api/inventory/consumable`);
      const heldResponse = yield axios.get(`/api/inventory/held`);
      yield put({
        type: 'SET_CONSUMABLE_ITEMS',
        payload: itemsResponse.data
      });
      yield put({
        type: 'SET_HELD_ITEMS',
        payload: heldResponse.data
      });
    } catch (error) {
      console.log('fetchAllItems error:', error);
    }
  }

  function* fetchInventory() {
    // console.log('action.payload', action.payload);
    try {
      const usersInventoryResponse = yield axios.get(`/api/inventory/user/inventory`);
      const usersHeldResponse = yield axios.get(`/api/inventory/user/held`);
      const usersConsumableResponse = yield axios.get(`/api/inventory/user/consumable`);
      yield put({
        type: 'SET_USERS_INVENTORY',
        payload: usersInventoryResponse.data
      });
      yield put({
        type: 'SET_USERS_HELD',
        payload: usersHeldResponse.data
      });
      yield put({
        type: 'SET_USERS_CONSUMABLE',
        payload: usersConsumableResponse.data
      });
    } catch (error) {
      console.log('fetchInventory error:', error);
    }
  }

  function* buyItem(action) {
    console.log('action.payload', action.payload);
    try {
      const response = yield axios({
        method: 'PUT',
        url: `/api/inventory/buy/item/${action.payload.itemId}`,
        data: action.payload
      })
      yield put({
        type: 'SAGA_FETCH_IVENTORY',
      })
      yield put({
        type: 'FETCH_USER',
      })
    } catch (error) {
      console.log('Unable to put item into server', error);
    }
  }

  function* sellItem(action) {
    // console.log('action.payload', action.payload);
    try {
      const response = yield axios({
        method: 'PUT',
        url: `/api/inventory/sell/item/${action.payload.itemId}`,
        data: action.payload
      })
      yield put({
        type: 'SAGA_FETCH_IVENTORY',
      })
      yield put({
        type: 'FETCH_USER',
      })
    } catch (error) {
      console.log('Unable to sell item from server', error);
    }
  }

  function* useItem(action) {
    // console.log('action.payload', action.payload);
    try {
      const response = yield axios({
        method: 'PUT',
        url: `/api/inventory/use/item/${action.payload.itemId}`
      })
      yield put({
        type: 'SAGA_FETCH_IVENTORY',
      })
    } catch (error) {
      console.log('Unable to use item server', error);
    }
  }



  function* inventorySaga() {
    yield takeLatest('SAGA_FETCH_ITEMS', fetchAllItems);
    yield takeLatest('SAGA_FETCH_IVENTORY', fetchInventory);
    yield takeLatest('SAGA_BUY_ITEM', buyItem);
    yield takeLatest('SAGA_SELL_ITEM', sellItem);
    yield takeLatest('SAGA_USE_ITEM', useItem);
  
  }
  
  export default inventorySaga;