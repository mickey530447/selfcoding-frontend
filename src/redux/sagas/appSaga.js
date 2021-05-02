import { put, all, takeEvery } from 'redux-saga/effects';
// import querystring from "querystring";
import {
  getUserFailed,
  loginSuccess,
  loginFailed,
  getProblemListSuccess,
  getProblemListFailed,
  getUserByEmailSuccess,
  getUserByEmailFailed,
} from '../actions/appAction';
import { appActions } from '../constants/appAction';
import { REQUEST } from '../constants/action-type';
import Api from '../../core/api/apiConfig';

function* loginRequest(data) {
  //   yield put(setLoading(true));
  const { params } = data;
  console.log(params);
  const getUser = Api.post('login/', params);
  try {
    const response = yield getUser;
    sessionStorage.setItem('mytoken', response.data.token);
    sessionStorage.setItem('email', params.username);
    yield put(getUserFailed(false));
    yield put(
      loginSuccess({ token: response.data.token, email: params.username }),
    );
    // yield put(setLoading(false));
  } catch (error) {
    yield put(loginFailed(error.response && error.response.data));
    // yield put(setLoading(false));
  }
}

function* handleGetProblemList(data) {
  console.log('wtf');
  const { params } = data;
  try {
    const response = yield Api.post('getallsolveprob', params);
    yield put(getProblemListSuccess(response.data));
  } catch (error) {
    yield put(getProblemListFailed(error.response.data));
  }
}

function* handleGetUserDetail(data) {
  const { params } = data;
  if (!params) {
    return;
  }
  try {
    const response = yield Api.post('getuserbyemail', params);
    console.log(response.data);
    yield put(getUserByEmailSuccess(response.data));
  } catch (error) {
    yield put(getUserByEmailFailed(error.response.data));
  }
}

function* getMe() {
  //   yield put(setLoading(true));
  try {
    const option = {
      headers: {
        authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    };
    const response = yield Api.get('users/me', option);
    yield put(loginSuccess(response.data.data));
    // yield put(setLoading(false));
  } catch (error) {
    yield put(getUserFailed(true));
    // yield put(setLoading(false));
  }
}

function* authenticateSaga() {
  yield all([
    takeEvery(REQUEST(appActions.LOGIN), loginRequest),
    takeEvery(REQUEST(appActions.GET_USER_BY_EMAIL), handleGetUserDetail),
    takeEvery(REQUEST(appActions.GET_PROBLEM_LIST), handleGetProblemList),
    takeEvery(REQUEST(appActions.GET_USER), getMe),
  ]);
}

export default authenticateSaga;
