import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* fetchAllUsers() {
  try {
    const users = yield axios.get('/api/user/all');
    yield put({ type: 'SET_USERS', payload: users.data });
  } catch (error) {
    console.error('error in fetch all users', error);
  }
}

function* deleteUser(action) {
  try {
    console.log('in delete user for id', action.payload);
    yield axios.delete(`api/user/${action.payload}`);
    yield put({ type: 'FETCH_USERS' });
  } catch (error) {
    console.error('delete user error', error);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('FETCH_USERS', fetchAllUsers);
  yield takeEvery('DELETE_USER', deleteUser);
}

export default userSaga;
