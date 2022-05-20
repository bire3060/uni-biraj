import { combineReducers } from "redux";
import authPopupHandler from "./authPopupHandler";
import comparingCourses from "./compare-courses";
import course from "./course";
import courseFilter from "./courseFilter";
import institute from "./institute";
import homePageCourseFilter from "./homePageCourseFilter";
import getStartedFilterReducer from "./getStartedFilterReducer";
import studentDetails from "./studentDetailsReducer";
import userPermissionReducer from "./userPermissionReducer";
import catCourse from "./catCourseFilter";
import countryCourseFilter from "./countryCourseFilter";
import HeaderFilter from "./HeaderFilter";
import RangeSliderHandler from "./RangeSliderHandler";
import currentButtonValue from "./currentButtonValue";
import ClearRangeSlider from "./ClearRangeSlider";
import StudyType from "./StudyType";
// import MinMaxHandler from "./MinMaxHandler";

const rootReducer = combineReducers({
  authPopup: authPopupHandler,
  comparingCourses: comparingCourses,
  institute: institute,
  course: course,
  countryCourseFilter: countryCourseFilter,
  catCourse: catCourse,
  courseFilter: courseFilter,
  homeCourseFilter: homePageCourseFilter,
  getStarted: getStartedFilterReducer,
  studentDetails: studentDetails,
  permission: userPermissionReducer,
  headerFilter: HeaderFilter,
  multiRangeSlider: RangeSliderHandler,
  // minMaxValue: MinMaxHandler,
  currentButtonValue: currentButtonValue,
  isClearingRange: ClearRangeSlider,
  studyType: StudyType,
});

export default rootReducer;
