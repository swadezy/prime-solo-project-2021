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
  yield takeEvery('DELETE_BRAND', deleteBrand);
}

export default brandsSaga;
