import {
  ADD_COUNTRY_COURSE,
  REMOVE_COUNTRY_COURSE,
} from "../actions/country_course_type";
const initialState = {
  country_city: "",
  country_header: "",
};

const countryCourseFilter = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_COUNTRY_COURSE:
      return {
        ...state,
        country_city: payload.id,
        country_header: payload.title,
      };
    case REMOVE_COUNTRY_COURSE:
      return {
        ...state,
        country_city: "",
        country_header: "",
      };
    default: {
      return state;
    }
  }
};

export default countryCourseFilter;
