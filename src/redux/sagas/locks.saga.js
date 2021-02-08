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

function* postLock(action) {
  try {
    yield axios.post('/locks', action.payload);
    yield put({ type: 'SET_LOCKS' });
  } catch (error) {
    console.log('lock post error', error);
  }
}

function* locksSaga() {
  yield takeEvery('FETCH_ALL_LOCKS', fetchAllLocks);
  yield takeEvery('POST_LOCK', postLock);
}

export default locksSaga;
