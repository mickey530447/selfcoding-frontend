import { appActions } from '../constants/appAction';
import { REQUEST, SUCCESS, FAILURE } from '../constants/action-type';

export const login = (params) => ({
  type: REQUEST(appActions.LOGIN),
  params,
});

export const getUser = () => ({
  type: REQUEST(appActions.GET_USER),
});

export const getUserFailed = (data) => ({
  type: FAILURE(appActions.GET_USER),
  data,
});

export const getUserByEmail = (params) => ({
  type: REQUEST(appActions.GET_USER_BY_EMAIL),
  params,
});

export const getUserByEmailSuccess = (data) => ({
  type: SUCCESS(appActions.GET_USER_BY_EMAIL),
  data,
});

export const getUserByEmailFailed = (error) => ({
  type: FAILURE(appActions.GET_USER_BY_EMAIL),
  error,
});

export const loginSuccess = (data) => ({
  type: SUCCESS(appActions.LOGIN),
  data,
});

export const loginFailed = (error) => ({
  type: FAILURE(appActions.LOGIN),
  error,
});

export const resetLoginError = () => ({
  type: REQUEST(appActions.RESET_ERROR),
});

export const getProblemList = (params) => ({
  type: REQUEST(appActions.GET_PROBLEM_LIST),
  params,
});

export const getProblemListSuccess = (data) => ({
  type: SUCCESS(appActions.GET_PROBLEM_LIST),
  data
});

export const getProblemListFailed = (error) => ({
  type: FAILURE(appActions.GET_PROBLEM_LIST),
  error,
});

export const getProblemDetail = (params) => ({
  type: REQUEST(appActions.GET_PROBLEM_DETAIL),
  params,
});

export const getProblemDetailSuccess = (data) => ({
  type: SUCCESS(appActions.GET_PROBLEM_DETAIL),
  data
});

export const getProblemDetailFailed = (error) => ({
  type: FAILURE(appActions.GET_PROBLEM_DETAIL),
  error,
});

export const submitAnswer = (params) => ({
  type: REQUEST(appActions.SUBMIT_ANSWER),
  params,
});

export const submitAnswerSuccess = (data) => ({
  type: SUCCESS(appActions.SUBMIT_ANSWER),
  data
});

export const submitAnswerFailed = (error) => ({
  type: FAILURE(appActions.SUBMIT_ANSWER),
  error,
});

