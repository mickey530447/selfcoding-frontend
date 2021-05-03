import { appActions } from '../constants/appAction';
import { REQUEST, SUCCESS, FAILURE } from '../constants/action-type';

const initialState = {
  isLoading: false,
  currentUser: undefined,
  loginError: undefined,
  getMeFailed: false,
  currentUserDetail: undefined,
  problemList: [],
  getProblemError: undefined,
  problemDetail: undefined,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST(appActions.LOGIN):
      return {
        ...state,
        isLoading: true,
      };
    case SUCCESS(appActions.LOGIN):
      return {
        ...state,
        currentUser: action.data,
        isLoading: false,
      };
    case SUCCESS(appActions.GET_PROBLEM_LIST):
      return {
        ...state,
        problemList: action.data,
      };
    case SUCCESS(appActions.GET_USER_BY_EMAIL):
      return {
        ...state,
        currentUserDetail: action.data,
        getMeFailed: false,
      };
    case FAILURE(appActions.GET_USER_BY_EMAIL):
      return {
        ...state,
        getMeFailed: true,
      };
    case FAILURE(appActions.LOGIN):
      return {
        ...state,
        isLoading: false,
        loginError: action.error,
      };
    case REQUEST(appActions.RESET_ERROR):
      return {
        ...state,
        loginError: undefined,
      };
    case FAILURE(appActions.GET_USER):
      return {
        ...state,
        getMeFailed: action.data,
      };
    case SUCCESS(appActions.GET_PROBLEM_DETAIL):
      return {
        ...state,
        problemDetail: action.data,
      };
    case FAILURE(appActions.GET_PROBLEM_DETAIL):
      return {
        ...state,
        problemDetail: undefined,
        getProblemError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
