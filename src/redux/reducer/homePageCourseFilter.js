import {
  ADD_DEGREE_LEVEL_HOME,
  ADD_COURSES,
  ADD_CITIES,
  REMOVE_HOME_COURSES_FILTER,
} from "../actions/home_page_course_filter";

const initialState = {
  degree_level_home: "",
  category_home: "",
  city_home: "",
};

const homePageCourseFilter = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REMOVE_HOME_COURSES_FILTER:
      return {
        ...state,
        degree_level_home: "",
        category_home: "",
        city_home: "",
      };
    case ADD_DEGREE_LEVEL_HOME:
      return {
        ...state,
        degree_level_home: payload,
      };
    case ADD_CITIES:
      return {
        ...state,
        city_home: payload,
      };
    case ADD_COURSES:
      return {
        ...state,
        category_home: payload,
      };
    default: {
      return state;
    }
  }
};
export default homePageCourseFilter;
