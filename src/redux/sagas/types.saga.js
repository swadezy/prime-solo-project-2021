import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchTypes() {
  try {
    const types = yield axios.get('/types');
    console.log('got types', types.data);
    yield put({ type: 'SET_TYPES', payload: types.data });
  } catch (error) {
    console.log('type fetch error', error);
  }
}

function* typesSaga() {
  yield takeEvery('FETCH_TYPES', fetchTypes);
}

export default typesSaga;