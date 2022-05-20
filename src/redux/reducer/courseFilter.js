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
  COURSE_COUNT,
  REMOVE_INTERNATIONAL_FEE,
  ADD_INTERNATIONAL_FEE,
} from "../actions/courseFilterTypes";

const initialState = {
  course_count: 0,
  city: [],
  tryCity: [],
  city_store: [],
  city_count: 0,
  category: [],
  tryCategory: [],
  category_store: [],
  categories_count: 0,
  degree_level: [],
  tryDegree: [],
  tryDuration: [],

  degree_level_store: [],
  degree_level_count: 0,
  duration: [],
  internationalFee: [],
  duration_store: [],
  duration_count: 0,
  study_mode: "BO,OC,ON",
  study_load: "BO,FT,PT",
};

const courseFilter = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case COURSE_COUNT:
      return {
        ...state,
        course_count: payload,
      };
    case REMOVE_STORE_FIELDS:
      return {
        ...state,
        course_count: 0,
        city: [],
        tryCity: [],
        city_store: [],
        city_count: 0,
        category: [],
        tryCategory: [],
        category_store: [],
        categories_count: 0,
        degree_level: [],
        tryDegree: [],
        degree_level_store: [],
        degree_level_count: 0,
        duration: [],
        tryDuration: [],
        duration_store: [],
        duration_count: 0,
        study_mode: "BO,OC,ON",
        study_load: "BO,FT,PT",
      };

    case RESET_COURSE_DATA:
      return {
        ...state,
        tryCity: [],
        city_count: state.city_store.length,
        tryCategory: [],
        categories_count: state.category_store.length,
        tryDegree: [],
        degree_level_count: state.degree_level_store.length,
        tryDuration: [],
        duration_count: state.duration_store.length,
        study_mode: "BO,OC,ON",
        study_load: "BO,FT,PT",
      };
    case ADD_COUNT:
      const { property, value } = payload;
      return {
        ...state,
        [property]: value,
      };
    case ADD_COUNTRY:
      if (state.city_count === 0) {
        return {
          ...state,
          city: payload,
          city_store: payload,
        };
      } else if (state.city_count === state.city.length) {
        return {
          ...state,
          city: [payload],
          tryCity: [payload],
          city_count: state.city_count + 1,
        };
      } else {
        return {
          ...state,
          city: [...state.city, payload],
          tryCity: [...state.city, payload],
        };
      }
    case REMOVE_COUNTRY:
      const filterCountry = state.city.filter((data) => data !== payload);
      if (filterCountry.length === 0) {
        return {
          ...state,
          city: state.city_store,
          city_count: state.city_count - 1,
          tryCity: [],
        };
      } else {
        return {
          ...state,
          city: filterCountry,
          tryCity: filterCountry,
        };
      }
    case ADD_CATEGORIES:
      if (state.categories_count === 0) {
        return {
          ...state,
          category: payload,
          // tryCat:payload,
          category_store: payload,
        };
      } else if (state.categories_count === state.category.length) {
        return {
          ...state,
          category: [payload],
          tryCategory: [payload],
          categories_count: state.categories_count + 1,
        };
      } else {
        let val = state.category.filter((data) => data === payload);

        if (val.length > 0) {
          return state;
        } else {
          return {
            ...state,
            category: [...state.category, payload],
            tryCategory: [...state.category, payload],
          };
        }
      }
    case REMOVE_CATEGORIES:
      const filterCat = state.tryCategory.filter((data) => data !== payload);

      if (filterCat.length === 0) {
        return {
          ...state,
          category: state.category_store,
          categories_count: state.categories_count - 1,
          tryCategory: [],
        };
      } else {
        return {
          ...state,
          category: filterCat,
          tryCategory: filterCat,
        };
      }
    case ADD_DEGREE_LEVEL:
      if (state.degree_level_count === 0) {
        return {
          ...state,
          degree_level: payload,
          degree_level_store: payload,
        };
      } else if (state.degree_level_count === state.degree_level.length) {
        return {
          ...state,
          degree_level: [payload],
          tryDegree: [payload],
          degree_level_count: state.degree_level_count + 1,
        };
      } else {
        return {
          ...state,
          degree_level: [...state.degree_level, payload],
          tryDegree: [...state.degree_level, payload],
        };
      }
    case REMOVE_DEGREE_LEVEL:
      const filterDeg = state.tryDegree.filter((data) => data !== payload);
      if (filterDeg.length === 0) {
        return {
          ...state,
          degree_level: state.degree_level_store,
          degree_level_count: state.degree_level_count - 1,
          tryDegree: [],
        };
      } else {
        return {
          ...state,
          degree_level: filterDeg,
          tryDegree: filterDeg,
        };
      }
    case ADD_DURATION:
      if (state.duration_count === 0) {
        return {
          ...state,
          duration: payload,
          duration_store: payload,
        };
      } else if (state.duration_count === state.duration.length) {
        return {
          ...state,
          duration: [payload],
          tryDuration: [payload],

          duration_count: state.duration_count + 1,
        };
      } else {
        return {
          ...state,
          duration: [...state.duration, payload],
          tryDuration: [...state.duration, payload],
        };
      }
    case REMOVE_DURATION:
      const filterDUration = state.tryDuration.filter(
        (data) => data !== payload
      );
      if (filterDUration.length === 0) {
        return {
          ...state,
          duration: state.duration_store,
          duration_count: state.duration_count - 1,
          tryDuration: [],
        };
      } else {
        return {
          ...state,
          duration: filterDUration,
          tryDuration: filterDUration,
        };
      }

    // adding the internation fee
    case ADD_INTERNATIONAL_FEE:
      return {
        ...state,
        internationalFee: payload,
      };

    case ADD_STUDY_MODE:
      return {
        ...state,
        study_mode: payload,
      };
    case ADD_STUDY_LOAD:
      return {
        ...state,
        study_load: payload,
      };
    default: {
      return state;
    }
  }
};

export default courseFilter;
