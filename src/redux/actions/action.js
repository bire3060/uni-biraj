import {
  ADD_COUNTRY,
  REMOVE_COUNTRY,
  ADD_CATEGORIES,
  REMOVE_CATEGORIES,
  ADD_DEGREE_LEVEL,
  REMOVE_DEGREE_LEVEL,
  ADD_DURATION,
  REMOVE_DURATION,
  ADD_STUDY_MODE,
  ADD_STUDY_LOAD,
  ADD_COUNT,
  RESET_COURSE_DATA,
  REMOVE_STORE_FIELDS,
  ADD_INTERNATIONAL_FEE,
} from "./courseFilterTypes";

//remove store fields
export const remove_store_field = () => {
  return {
    type: REMOVE_STORE_FIELDS,
  };
};
//reset data
export const reset_course_data = () => {
  return {
    type: RESET_COURSE_DATA,
  };
};
//add count
export const add_count = (property, value) => {
  return {
    type: ADD_COUNT,
    payload: {
      property,
      value,
    },
  };
};
//add country
export const add_country = (data) => {
  return {
    type: ADD_COUNTRY,
    payload: data,
  };
};
//remove country
export const remove_country = (data) => {
  return {
    type: REMOVE_COUNTRY,
    payload: data,
  };
};

// categories add filter
export const add_categories = (data) => {
  return {
    type: ADD_CATEGORIES,
    payload: data,
  };
};
// categories remove filter
export const remove_categories = (data) => {
  return {
    type: REMOVE_CATEGORIES,
    payload: data,
  };
};

// degree_level add filter
export const add_degree_level = (data) => {
  return {
    type: ADD_DEGREE_LEVEL,
    payload: data,
  };
};
// degree_level remove filter
export const remove_degree_level = (data) => {
  return {
    type: REMOVE_DEGREE_LEVEL,
    payload: data,
  };
};
// duration add filter
export const add_duration = (data) => {
  return {
    type: ADD_DURATION,
    payload: data,
  };
};
// duration remove filter
export const remove_duration = (data) => {
  return {
    type: REMOVE_DURATION,
    payload: data,
  };
};
// removing the range slider default value
// export const remove_rangeSlider = (data) => {
//   return {
//     type: "REMOVE_RANGE_SLIDER",
//     payload: data,
//   };
// };

export const add_rangeSlider = (data) => {
  return {
    type: ADD_INTERNATIONAL_FEE,
    payload: data,
  };
};

// study_load add filter
export const add_study_load = (data) => {
  return {
    type: ADD_STUDY_LOAD,
    payload: data,
  };
};
// study_mode add filter
export const add_study_mode = (data) => {
  return {
    type: ADD_STUDY_MODE,
    payload: data,
  };
};
