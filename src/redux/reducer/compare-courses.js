import {
  COMPARE_COURSE_ADD,
  COMPARE_COURSE_REMOVE,
} from "../actions/actionsTypes";

const initialState = {
  courses: [],
};

const comparingCourses = (state = initialState, action) => {
  switch (action.type) {
    case COMPARE_COURSE_ADD:
      const addCourse = action.payload.course;
      const checkInArray = state.courses.filter(
        (course) => course.slug === addCourse.slug
      );
      const result = [...state.courses];
      if (checkInArray.length === 0) {
        result.push(addCourse);
      }
      return {
        ...state,
        courses: result,
      };

    case COMPARE_COURSE_REMOVE:
      const slug = action.payload.slug;
      return {
        courses: state.courses.filter((course) => course.slug !== slug),
      };

    default:
      return state;
  }
};

export default comparingCourses;
