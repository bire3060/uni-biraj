import {
  ADD_PERMISSIONS_LISTS,
  ADD_PERMISSION,
  SET_ROLE_DASH,
} from "../actions/user_role_type";
const initialState = {
  permissions_list: [],
  permissions: [],
  courses: false,
  institutes: false,
  authuser: false,
  educations: false,
  sitesettings: false,
  blogsandjobs: false,
  notification: false,
  inquery: false,
};

const userPermissionReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_PERMISSIONS_LISTS:
      return {
        ...state,
        permissions_list: payload,
      };
    case ADD_PERMISSION:
      let newPermissions = [];
      for (let i = 0; i < payload.content_type.length; i++) {
        for (let j = 0; j < state.permissions_list.length; j++) {
          if (payload.content_type[i] === state.permissions_list[j].id) {
            newPermissions.push(state.permissions_list[j]);
          }
        }
      }
      return {
        ...state,
        permissions: newPermissions,
      };
    case SET_ROLE_DASH:
      return {
        ...state,
        [payload]: true,
      };

    default:
      return state;
  }
};

export default userPermissionReducer;
