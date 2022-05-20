import {
  ADD_GET_STARTED_FILTER,
  REMOVE_GET_STARTED_FILTER,
} from "../actions/getStartedType";

const initialState = {
  degree_level_started: "",
  category_started: "",
  city_started: "",
  study_load_started: "",
  study_mode_started: "",
  duration_started: "",
  country_started: "",
};

const getStartedFilterReducer = (state = initialState, action) => {
  const { type, payload, property } = action;
  switch (type) {
    case ADD_GET_STARTED_FILTER:
      return {
        ...state,
        [property]: payload,
      };
    case REMOVE_GET_STARTED_FILTER:
      return {
        ...state,
        degree_level_started: "",
        category_started: "",
        city_started: "",
        study_load_started: "",
        study_mode_started: "",
        duration_started: "",
      };
    default: {
      return state;
    }
  }
};

export default getStartedFilterReducer;
