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

export const setLoading = (params) => {
  
}

