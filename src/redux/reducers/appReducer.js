import { appActions } from '../constants/appAction';
import { REQUEST, SUCCESS, FAILURE } from '../constants/action-type';

const initialState = {
  isLoading: false,
  currentUser: undefined,
  loginError: undefined,
  getMeFailed: false,
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
    default:
      return state;
  }
};

export default reducer;
