import {
  AUTHENTICATION_POPUP_HIDE,
  AUTHENTICATION_POPUP_SHOW,
} from "../actions/actionsTypes";

const initialState = {
  auth_popup: false,
};

const authPopupHandler = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATION_POPUP_SHOW:
      return {
        auth_popup: true,
      };
    case AUTHENTICATION_POPUP_HIDE:
      return {
        auth_popup: false,
      };

    default:
      return state;
  }
};

export default authPopupHandler;
