import {
  ADD_STUDENT_DETAILS,
  ADD_STUDENT_DETAILS_ERROR,
  ADD_MORE_EDU,
  ACADEMIC_UPDATE,
  ENGLISH_PRO_UPDATE,
  ADD_ENGLISH_PRO,
  ADD_STD_DOCS,
  REMOVE_STD_DOCS,
  REMOVE_EDU,
  REMOVE_ENGLISH_PRO,
  EDU_ERROR,
  ENGLISH_ERROR,
  MAKE_EDU_BLANK,
  MAKE_ENGLISH_PRO,
  ADD_ISFETCHED,
  CLEAR_STD_DETAILS,
} from "../actions/student_details_types";
const initialState = {
  basic_details: {
    fname: "",
    lname: "",
    email: "",
    DOB: "",
    gender: "",
    address: "",
    country_code: "",
    phone: "",
    passport_no: "",
    nationality: "",
    preferred_country: "",
    preferred_date: "",
    errors: {
      fname: "",
      lname: "",
      email: "",
      DOB: "",
      gender: "",
      address: "",
      country_code: "",
      phone: "",
      passport_no: "",
      nationality: "",
      preferred_country: "",
      preferred_date: "",
    },
  },
  isFetched: false,
  academic: [],
  academic_error: "",
  english_error: "",
  english_proficiency: [],
  documents: [],
};

const studentDetails = (state = initialState, action) => {
  const { type, payload } = action;
  // const { academic_error } = state;
  switch (type) {
    case CLEAR_STD_DETAILS:
      return {
        ...state,
        basic_details: {
          fname: "",
          lname: "",
          email: "",
          DOB: "",
          gender: "",
          address: "",
          country_code: "",
          phone: "",
          passport_no: "",
          nationality: "",
          preferred_country: "",
          preferred_date: "",
          errors: {
            fname: "",
            lname: "",
            email: "",
            DOB: "",
            gender: "",
            address: "",
            country_code: "",
            phone: "",
            passport_no: "",
            nationality: "",
            preferred_country: "",
            preferred_date: "",
          },
        },
        isFetched: false,
        academic: [],
        academic_error: "",
        english_error: "",
        english_proficiency: [],
        documents: [],
      };
    case ADD_ISFETCHED:
      return {
        ...state,
        isFetched: true,
      };
    case EDU_ERROR:
      return {
        ...state,
        academic_error: payload,
      };
    case MAKE_EDU_BLANK:
      return {
        ...state,
        academic: [],
      };
    case MAKE_ENGLISH_PRO:
      return {
        ...state,
        english_proficiency: [],
      };
    case ENGLISH_ERROR:
      return {
        ...state,
        english_error: payload,
      };
    case REMOVE_STD_DOCS: {
      return {
        ...state,
        documents: state.documents.filter((a, i) => i !== action.payload.index),
      };
    }
    case ADD_STD_DOCS: {
      return {
        ...state,
        documents: [
          ...state.documents,
          {
            ...action.payload,
          },
        ],
      };
    }
    case ADD_ENGLISH_PRO:
      return {
        ...state,
        english_proficiency: [...state.english_proficiency, payload],
      };
    case REMOVE_ENGLISH_PRO:
      const newVal2 = state.english_proficiency.filter(
        (data, index) => index !== action.payload
      );
      return {
        ...state,
        english_proficiency: newVal2,
      };

    case ENGLISH_PRO_UPDATE: {
      const { english_proficiency } = state;
      const { index, value, property } = payload;
      english_proficiency[index][property] = value;
      return {
        ...state,
      };
    }
    case ADD_MORE_EDU:
      return {
        ...state,
        academic: [...state.academic, payload],
      };
    case REMOVE_EDU:
      const newVal = state.academic.filter(
        (data, index) => index !== action.payload
      );
      return {
        ...state,
        academic: newVal,
      };
    case ACADEMIC_UPDATE: {
      const { academic } = state;
      const { index, value, property } = payload;
      academic[index][property] = value;
      return {
        ...state,
      };
    }
    case ADD_STUDENT_DETAILS:
      const { property, value } = payload;
      return {
        ...state,
        basic_details: {
          ...state.basic_details,
          [property]: value,
        },
      };
    case ADD_STUDENT_DETAILS_ERROR: {
      const { property, error } = payload;
      return {
        ...state,
        basic_details: {
          ...state.basic_details,
          errors: {
            ...state.basic_details.errors,
            [property]: error,
          },
        },
      };
    }
    default:
      return state;
  }
};

export default studentDetails;
