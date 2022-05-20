import {
  COURSE_BASIC_DETAIL_ADD,
  COURSE_BASIC_DETAIL_ERROR,
  COURSE_STUDY_LOAD_ADD,
  COURSE_STUDY_MODE_ADD,
  COURSE_DESCRIPTION_ADD,
  COURSE_DESCRIPTION_ERROR,
  COURSE_DOMESTICE_FEE_ADD,
  COURSE_INTERNATION_FEE_ADD,
  COURSE_IELTS_DETAILS_ADD,
  COURSE_PTE_DETAILS_ADD,
  COURSE_INSTITUTE_ADD,
  COURSE_CATEGORY_ADD,
  COURSE_IMAGE_ADD,
  COURSE_CATEGORY_ERROR,
  COURSE_INSTITUTE_ERROR,
  COURSE_INTERNATION_FEE_ERROR,
  COURSE_DOMESTICE_FEE_ERROR,
  COURSE_IELTS_DETAILS_ERROR,
  COURSE_PTE_DETAILS_ERROR,
  ADD_DEGREE_LEVEL_BASIC,
  REMOVE_ALL_COURSES_FILED,
  COURSE_DATA,
} from "../actions/actionsTypes";

const initialState = {
  institute: [],
  category: [],
  title: "",
  descripton: "",
  status: "",
  duration: "",
  domestice_fee: "",
  international_fee: "",
  location: "",
  level: "",
  degree_level: "",
  study_mode: "",
  coursesdata: [],
  study_load: "",
  image: "",
  ietls: {
    reading: "",
    writing: "",
    speaking: "",
    listening: "",
    overall: "",
    errors: {
      reading: "",
      writing: "",
      speaking: "",
      listening: "",
      overall: "",
    },
  },
  pte: {
    reading: "",
    writing: "",
    speaking: "",
    listening: "",
    overall: "",
    errors: {
      reading: "",
      writing: "",
      speaking: "",
      listening: "",
      overall: "",
    },
  },
  errors: {
    institute: "",
    title: "",
    category: "",
    descripton: "",
    status: "",
    duration: "",
    domestice_fee: "",
    international_fee: "",
    study_mode: "",
    location: "",
    level: "",
    degree_level: "",
    study_load: "",
  },
};

const course = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REMOVE_ALL_COURSES_FILED:
      return {
        ...state,
        institute: [],
        category: [],
        title: "",
        descripton: "",
        status: "",
        duration: "",
        domestice_fee: "",
        international_fee: "",
        location: "",
        level: "",
        degree_level: "",
        study_mode: "",
        study_load: "",
        image: "",
        ietls: {
          reading: "",
          writing: "",
          speaking: "",
          listening: "",
          overall: "",
          errors: {
            reading: "",
            writing: "",
            speaking: "",
            listening: "",
            overall: "",
          },
        },
        pte: {
          reading: "",
          writing: "",
          speaking: "",
          listening: "",
          overall: "",
          errors: {
            reading: "",
            writing: "",
            speaking: "",
            listening: "",
            overall: "",
          },
        },
        errors: {
          institute: "",
          title: "",
          category: "",
          descripton: "",
          status: "",
          duration: "",
          domestice_fee: "",
          international_fee: "",
          study_mode: "",
          location: "",
          level: "",
          degree_level: "",
          study_load: "",
        },
      };
    case ADD_DEGREE_LEVEL_BASIC:
      return {
        ...state,
        degree_level: payload,
      };
    case COURSE_BASIC_DETAIL_ADD: {
      const { property, value } = payload;
      return {
        ...state,
        [property]: value,
      };
    }
    case COURSE_IELTS_DETAILS_ADD: {
      const { property, value } = action.payload;
      return {
        ...state,
        ietls: {
          ...state.ietls,
          [property]: value,
        },
      };
    }
    case COURSE_PTE_DETAILS_ADD: {
      const { property, value } = action.payload;
      return {
        ...state,
        pte: {
          ...state.pte,
          [property]: value,
        },
      };
    }
    case COURSE_BASIC_DETAIL_ERROR: {
      const { property, error } = payload;
      return {
        ...state,
        errors: {
          ...state.errors,
          [property]: error,
        },
      };
    }
    case COURSE_DATA: {
      const { data } = payload;
      return {
        ...state,
        coursesdata: data,
      };
    }
    case COURSE_IELTS_DETAILS_ERROR: {
      const { property, error } = payload;
      return {
        ...state,
        ietls: {
          ...state.ietls,
          errors: {
            ...state.ietls.errors,
            [property]: error,
          },
        },
      };
    }
    case COURSE_PTE_DETAILS_ERROR: {
      const { property, error } = payload;
      return {
        ...state,
        pte: {
          ...state.pte,
          errors: {
            ...state.pte.errors,
            [property]: error,
          },
        },
      };
    }
    case COURSE_INSTITUTE_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          institute: action.payload,
        },
      };
    case COURSE_CATEGORY_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          category: action.payload,
        },
      };
    case COURSE_DOMESTICE_FEE_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          domestice_fee: action.payload,
        },
      };
    case COURSE_INTERNATION_FEE_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          international_fee: action.payload,
        },
      };
    case COURSE_STUDY_LOAD_ADD: {
      return {
        ...state,
        study_load: action.payload,
      };
    }
    case COURSE_STUDY_MODE_ADD: {
      return {
        ...state,
        study_mode: action.payload,
      };
    }
    case COURSE_INSTITUTE_ADD: {
      return {
        ...state,
        institute: action.payload,
      };
    }
    case COURSE_CATEGORY_ADD: {
      return {
        ...state,
        category: action.payload,
      };
    }
    case COURSE_IMAGE_ADD:
      return {
        ...state,
        image: action.payload,
      };
    case COURSE_DESCRIPTION_ADD:
      return {
        ...state,
        descripton: action.payload,
      };
    case COURSE_DESCRIPTION_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          descripton: action.payload,
        },
      };
    case COURSE_DOMESTICE_FEE_ADD:
      return {
        ...state,
        domestice_fee: action.payload,
      };
    case COURSE_INTERNATION_FEE_ADD:
      return {
        ...state,
        international_fee: action.payload,
      };
    default: {
      return state;
    }
  }
};

export default course;
