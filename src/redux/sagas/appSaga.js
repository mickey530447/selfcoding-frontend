import { put, all, takeEvery } from 'redux-saga/effects';
// import querystring from "querystring";
import { getUserFailed, loginSuccess, loginFailed } from '../actions/appAction'
import { appActions } from '../constants/appAction';
import { REQUEST } from '../constants/action-type';
import Api from '../../core/api/apiConfig';

function* loginRequest(data) {
    console.log(data);
    //   yield put(setLoading(true));
    const { params } = data;
    const getUser = Api.post('login/', params);
    try {
        const response = yield getUser;
        sessionStorage.setItem('mytoken', response.data.token);
        yield put(getUserFailed(false));
        yield put(loginSuccess(response.data.token));
        // yield put(setLoading(false));
    } catch (error) {
        yield put(loginFailed(error.response && error.response.data));
        // yield put(setLoading(false));
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
        takeEvery(REQUEST(appActions.GET_USER), getMe),
    ]);
}

export default authenticateSaga;
