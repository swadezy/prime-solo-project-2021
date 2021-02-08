import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchAllLocks() {
  try {
    const locks = yield axios.get('/locks/all');
    console.log('got locks', locks.data);
    yield put({ type: 'SET_LOCKS', payload: locks.data });
  } catch (error) {
    console.error('all locks fetch error', error);
  }
}

function* fetchDetails(action) {
  try {
    const lock = yield axios.get(`/locks/${action.payload}`);
    console.log('id', action.payload, 'received lock', lock.data);
    yield put({ type: 'SET_LOCK', payload: lock.data[0] });
  } catch (error) {
    console.error('lock details fetch error', error);
  }
}

function* postLock(action) {
  try {
    yield axios.post('/locks', action.payload);
    yield put({ type: 'FETCH_ALL_LOCKS' });
  } catch (error) {
    console.error('lock post error', error);
  }
}

function* updateLock(action) {
  try {
    console.log('in update lock with lock', action.payload);
    yield axios.put(`/locks/${action.payload.id}`, action.payload);
    yield put({ type: 'FETCH_DETAILS' });
  } catch (error) {
    console.error('lock update error', error);
  }
}

function* deleteLock(action) {
  try {
    console.log('in delete lock for id', action.payload);
    yield axios.delete(`/locks/${action.payload}`);
    yield put({ type: 'FETCH_DETAILS' });
  } catch (error) {
    console.error('delete lock error', error);
  }
}

function* locksSaga() {
  yield takeEvery('FETCH_ALL_LOCKS', fetchAllLocks);
  yield takeEvery('FETCH_DETAILS', fetchDetails);
  yield takeEvery('POST_LOCK', postLock);
  yield takeEvery('UPDATE_LOCK', updateLock);
  yield takeEvery('DELETE_LOCK', deleteLock);
}

export default locksSaga;
