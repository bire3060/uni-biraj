import { ADD_CAT_COURSE, REMOVE_CAT_COURSE } from "../actions/cat_course_type";
const initialState = {
  cat_category: "",
};

const catCourse = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_CAT_COURSE:
      return {
        ...state,
        cat_category: payload,
      };
    case REMOVE_CAT_COURSE:
      return {
        ...state,
        cat_category: "",
      };
    default: {
      return state;
    }
  }
};

export default catCourse;
