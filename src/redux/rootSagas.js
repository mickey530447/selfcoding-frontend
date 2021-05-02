import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import appActions from './sagas/appSaga'

export const sagaMiddleware = createSagaMiddleware();

export default function* rootSaga() {
  yield all([
    appActions(),
  ]);
}
