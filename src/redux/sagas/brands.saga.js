import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchBrands() {
  try {
    const brands = yield axios.get('/brands');
    console.log('got brands', brands.data);
    yield put({ type: 'SET_BRANDS', payload: brands.data });
  } catch (error) {
    console.log('brand fetch error', error);
  }
}

function* brandsSaga() {
  yield takeEvery('FETCH_BRANDS', fetchBrands);
}

export default brandsSaga;
