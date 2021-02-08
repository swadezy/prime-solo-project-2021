import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchAllLocks() {
  try {
    const locks = yield axios.get('/locks/all');
    console.log('got locks', locks.data);
    yield put({ type: 'SET_LOCKS', payload: locks.data });
  } catch (error) {
    console.log('lock fetch error', error);
  }
}

function* locksSaga() {
  yield takeEvery('FETCH_ALL_LOCKS', fetchAllLocks);
}

export default locksSaga;
