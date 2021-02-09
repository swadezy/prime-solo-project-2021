import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// get request for all pickings
function* fetchAllPickings(action) {
  try {
    const pickings = yield axios.get(`/pickings/${action.payload.lock}/${action.payload.brand}/${action.payload.type}`);
    yield put({ type: 'SET_PICKINGS', payload: pickings.data });
  } catch (error) {
    console.error('all pickings fetch error', error);
  }
}

// get request for details for one picking event
// function* fetchDetails(action) {
//   try {
//     const lock = yield axios.get(`/locks/${action.payload}`);
//     console.log('id', action.payload, 'received lock', lock.data);
//     yield put({ type: 'SET_LOCK', payload: lock.data[0] });
//   } catch (error) {
//     console.error('lock details fetch error', error);
//   }
// }

// post request to add a picking event
function* postPicking(action) {
  try {
    yield axios.post('/pickings', action.payload);
    yield put({ type: 'FETCH_ALL_PICKINGS' });
  } catch (error) {
    console.error('picking post error', error);
  }
}

// put request to update a picking event
// function* updateLock(action) {
//   try {
//     console.log('in update lock with lock', action.payload);
//     yield axios.put(`/locks/${action.payload.id}`, action.payload);
//     yield put({ type: 'FETCH_DETAILS' });
//   } catch (error) {
//     console.error('lock update error', error);
//   }
// }

// delete request to delete a picking event
// function* deleteLock(action) {
//   try {
//     console.log('in delete lock for id', action.payload);
//     yield axios.delete(`/locks/${action.payload}`);
//     yield put({ type: 'FETCH_DETAILS' });
//   } catch (error) {
//     console.error('delete lock error', error);
//   }
// }

function* pickingsSaga() {
  yield takeEvery('FETCH_ALL_PICKINGS', fetchAllPickings);
  yield takeEvery('POST_PICKING', postPicking);
}

export default pickingsSaga;
