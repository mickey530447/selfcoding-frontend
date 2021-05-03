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
  getProblemDetailSuccess,
  getProblemDetailFailed,
  submitAnswerSuccess,
  submitAnswerFailed,
  getTopicListSuccess,
  getTopicListFailed,
  verifyTopicSuccess,
  verifyTopicFailed,
} from '../actions/appAction';
import { appActions } from '../constants/appAction';
import { REQUEST } from '../constants/action-type';
import Api from '../../core/api/apiConfig';

function* loginRequest(data) {
  const { params } = data;
  const getUser = Api.post('login/', params);
  try {
    const response = yield getUser;
    sessionStorage.setItem('mytoken', response.data.token);
    sessionStorage.setItem('email', params.username);
    yield put(getUserFailed(false));
    yield put(
      loginSuccess({ token: response.data.token, email: params.username }),
    );
  } catch (error) {
    yield put(loginFailed(error.response && error.response.data));
  }
}

function* handleGetProblemList(data) {
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
    yield put(getUserByEmailSuccess(response.data));
  } catch (error) {
    yield put(getUserByEmailFailed(error.response.data));
  }
}

function* handleGetProblemDetail(data) {
  const { params } = data;
  if (!params) {
    return;
  }
  try {
    const response = yield Api.get(`problems/${params}/`);
    yield put(getProblemDetailSuccess(response.data));
  } catch (error) {
    yield put(getProblemDetailFailed(error.response.data));
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

function* handleSubmitAnswer(data) {
  const { params } = data;
  const formData = new FormData();
  formData.append('source', params.source);
  formData.append('compilerId', params.compilerId);
  formData.append('compilerVersionId', params.compilerVersionId);
  try {
    const response = yield Api.post(
      '',
      formData,
      {},
      'https://de07d001.compilers.sphere-engine.com/api/v4/submissions?access_token=6f3cd81ada05e4a41915a78f66419104',
    );
    yield put(submitAnswerSuccess(response.data.data));
    // yield put(setLoading(false));
  } catch (error) {
    yield put(submitAnswerFailed(true));
    // yield put(setLoading(false));
  }
}

function* handleGetTopicList() {
  try {
    const response = yield Api.get('topics/');
    yield put(getTopicListSuccess(response.data));
  } catch (error) {
    yield put(getTopicListFailed(error.response.data));
  }
}

function* handleDeleteTopic(data) {
  const { params } = data;
  try {
    // eslint-disable-next-line no-unused-vars
    const response = yield Api.delete(`topics/${params}/`);
    yield handleGetTopicList();
    // yield put(getTopicListSuccess(response.data));
  } catch (error) {
    yield put(getTopicListFailed(error.response.data));
  }
}

function* handleUpdateTopic(data) {
  const { params, topicId } = data;
  try {
    // eslint-disable-next-line no-unused-vars
    const response = yield Api.put(`topics/${topicId}/`, params);
    yield handleGetTopicList();
  } catch (error) {
    yield put(getTopicListFailed(error.response.data));
  }
}

function* handleCreateTopic(data) {
  const { params } = data;
  try {
    // eslint-disable-next-line no-unused-vars
    const response = yield Api.post(`topics/`, params);
    yield handleGetTopicList();
    // yield put(getTopicListSuccess(response.data));
  } catch (error) {
    yield put(getTopicListFailed(error.response.data));
  }
}

function* handleVerifyTopic(data) {
  const { params } = data;
  try {
    const response = yield Api.post('setverifiedtopic', params);
    yield handleGetTopicList();
    yield put(verifyTopicSuccess(response.data));
  } catch (error) {
    yield put(verifyTopicFailed(error.response.data))
  }
}

function* authenticateSaga() {
  yield all([
    takeEvery(REQUEST(appActions.LOGIN), loginRequest),
    takeEvery(REQUEST(appActions.GET_USER_BY_EMAIL), handleGetUserDetail),
    takeEvery(REQUEST(appActions.GET_PROBLEM_LIST), handleGetProblemList),
    takeEvery(REQUEST(appActions.GET_PROBLEM_DETAIL), handleGetProblemDetail),
    takeEvery(REQUEST(appActions.SUBMIT_ANSWER), handleSubmitAnswer),
    takeEvery(REQUEST(appActions.GET_TOPIC_LIST), handleGetTopicList),
    takeEvery(REQUEST(appActions.DELETE_TOPIC), handleDeleteTopic),
    takeEvery(REQUEST(appActions.UPDATE_TOPIC), handleUpdateTopic),
    takeEvery(REQUEST(appActions.CREATE_TOPIC), handleCreateTopic),
    takeEvery(REQUEST(appActions.ADMIN_VERIFY_TOPIC), handleVerifyTopic),
    takeEvery(REQUEST(appActions.GET_USER), getMe),
  ]);
}

export default authenticateSaga;
