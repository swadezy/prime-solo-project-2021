import { put, select, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// get request for all pickings
function* fetchAllPickings(action) {
  try {
    console.log('in fetch all pickings with filter', action.payload)
    yield put({
      type: action.payload ? 'SET_FILTER' : 'CLEAR_FILTER',
      payload: action.payload,
    });
    const state = yield select();
    const pickings = yield axios.get(
      `/pickings/all/${state.filter}`
    );
    yield put({ type: 'SET_PICKINGS', payload: pickings.data });
  } catch (error) {
    console.error('all pickings fetch error', error);
  }
}

// get request for details for one picking event
function* fetchPickDetails(action) {
  try {
    const picking = yield axios.get(`/pickings/${action.payload}`);
    yield put({ type: 'SET_PICKING', payload: picking.data[0] });
  } catch (error) {
    console.error('picking details fetch error', error);
  }
}

function* fetchSuccess(action) {
  try {
    const success = yield axios.get(`/pickings/success/${action.payload}`);
    yield put({ type: 'SET_SUCCESS', payload: success.data });
  } catch (error) {
    console.error('success status fetch error', error);
  }
}

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
function* updatePicking(action) {
  try {
    console.log('in update picking with picking', action.payload);
    yield axios.put(`/pickings/${action.payload.id}`, action.payload);
    yield put({ type: 'FETCH_DETAILS' });
  } catch (error) {
    console.error('picking update error', error);
  }
}

// delete request to delete a picking event
function* deletePicking(action) {
  try {
    console.log('in delete picking for id', action.payload);
    yield axios.delete(`/pickings/${action.payload}`);
    yield put({ type: 'FETCH_DETAILS' });
  } catch (error) {
    console.error('delete picking error', error);
  }
}

function* pickingsSaga() {
  yield takeEvery('FETCH_ALL_PICKINGS', fetchAllPickings);
  yield takeEvery('FETCH_PICKING_DETAILS', fetchPickDetails);
  yield takeEvery('FETCH_SUCCESS', fetchSuccess);
  yield takeEvery('POST_PICKING', postPicking);
  yield takeEvery('UPDATE_PICKING', updatePicking);
  yield takeEvery('DELETE_PICKING', deletePicking);
}

export default pickingsSaga;
