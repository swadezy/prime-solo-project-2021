import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// get request for brands
function* fetchBrands() {
  try {
    const brands = yield axios.get('/brands');
    yield put({ type: 'SET_BRANDS', payload: brands.data });
  } catch (error) {
    console.log('brand fetch error', error);
  }
}

// put request to update brands
function* updateBrands(action) {
  try {
    console.log('in update brands with brands', action.payload);
    yield axios.put(`/brands`, action.payload);
    yield put({ type: 'FETCH_BRANDS' });
  } catch (error) {
    console.error('brands update error', error);
  }
}

// delete request to delete a brand
function* deleteBrand(action) {
  try {
    console.log('in delete brand for id', action.payload);
    yield axios.delete(`/brands/${action.payload}`);
    yield put({ type: 'FETCH_BRANDS' });
  } catch (error) {
    console.error('delete brand error', error);
  }
}

function* brandsSaga() {
  yield takeEvery('FETCH_BRANDS', fetchBrands);
  yield takeEvery('UPDATE_BRANDS', updateBrands);
  yield takeEvery('DELETE_BRAND', deleteBrand);
}

export default brandsSaga;
