import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// get request for types
function* fetchTypes() {
  try {
    const types = yield axios.get('/types');
    yield put({ type: 'SET_TYPES', payload: types.data });
  } catch (error) {
    console.log('type fetch error', error);
  }
}

// put request to update types
function* updateTypes(action) {
  try {
    console.log('in update types with types', action.payload);
    yield axios.put(`/types`, action.payload);
    yield put({ type: 'FETCH_TYPES' });
  } catch (error) {
    console.error('types update error', error);
  }
}

// delete request to delete a type
function* deleteType(action) {
  try {
    console.log('in delete type for id', action.payload);
    yield axios.delete(`/types/${action.payload}`);
    yield put({ type: 'FETCH_TYPES' });
  } catch (error) {
    console.error('delete type error', error);
  }
}

function* typesSaga() {
  yield takeEvery('FETCH_TYPES', fetchTypes);
  yield takeEvery('UPDATE_TYPES', updateTypes);
  yield takeEvery('DELETE_TYPE', deleteType);
}

export default typesSaga;
